// Made by SyK
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { buildTree, predict, TreeNode, StatusSistem, SensorRecord, autoLabel } from './c45-engine';

const prisma = new PrismaClient();

// ==========================================================
// CACHE: POHON KEPUTUSAN DI MEMORI
// Menghindari re-training CPU-heavy tiap 2 detik
// ==========================================================
let cachedTree: TreeNode | null = null;
let lastTrainingTime = 0;
const RETRAIN_INTERVAL_MS = 5 * 60 * 1000; // Retrain otomatis tiap 5 menit

// ==========================================================
// FUNGSI TRAINING OTOMATIS (Jalan di Background)
// ==========================================================
async function getOrTrainTree(): Promise<TreeNode | null> {
  const now = Date.now();
  
  // Return cache jika masih valid
  if (cachedTree && (now - lastTrainingTime < RETRAIN_INTERVAL_MS)) {
    return cachedTree;
  }

  try {
    // Tarik maksimal 200 data terakhir untuk training agar cepat
    const historyData = await prisma.sensorLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200, 
    });

    if (historyData.length < 5) return null; // Data belum cukup untuk training

    // Map data dari DB ke format SensorRecord engine
    const trainingSet: SensorRecord[] = historyData.map(log => ({
      api_mentah: log.apiMentah,
      ma_gas: log.maGas,
      ma_suhu: log.maSuhu,
      ror_suhu: log.rorSuhu,
      label: (log.statusSistem as StatusSistem) || autoLabel({
        api_mentah: log.apiMentah,
        ma_gas: log.maGas,
        ma_suhu: log.maSuhu,
        ror_suhu: log.rorSuhu
      })
    }));

    cachedTree = buildTree(trainingSet);
    lastTrainingTime = now;
    console.log("[AI] Pohon Keputusan C4.5 Berhasil Di-Retrain!");
    
    return cachedTree;
  } catch (error) {
    console.error("[AI] Gagal training pohon:", error);
    return cachedTree; // Kembalikan versi lama kalau training gagal
  }
}

// ==========================================================
// FALLBACK RULE (Jika DB kosong & Pohon belum terbentuk)
// ==========================================================
function fallbackStaticRules(data: Omit<SensorRecord, "label">): StatusSistem {
  const { ma_suhu, ror_suhu, ma_gas } = data;
  if (ma_suhu <= 43.50) {
    if (ror_suhu <= 0.10) {
      return (ma_gas <= 645.00) ? "NORMAL" : "WARNING";
    }
    return "WARNING";
  }
  return "DANGER";
}

// ==========================================================
// POST — Terima data dari ESP32, Analisis, Simpan
// ==========================================================
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const incoming = {
      api_mentah:  payload.api_mentah  ?? 4095,
      gas_mentah:  payload.gas_mentah  ?? 0,
      suhu_mentah: payload.suhu_mentah ?? 0.0,
      ma_gas:      payload.ma_gas      ?? 0,
      ma_suhu:     payload.ma_suhu     ?? 0.0,
      ror_suhu:    payload.ror_suhu    ?? 0.0,
    };

    let status_sistem: StatusSistem = "NORMAL";

    // 1. FAIL-SAFE (Prioritas Mutlak)
    if (incoming.api_mentah < 1500) {
      console.log("[AI] FAIL-SAFE TRIGGERED: Api kasat mata!");
      status_sistem = "DANGER";
    } else {
      // 2. MESIN INFERENCE C4.5 
      const tree = await getOrTrainTree();
      
      if (tree) {
        const prediction = predict(tree, incoming);
        status_sistem = prediction.status;
      } else {
        // 3. STATIC FALLBACK (Jika sistem baru pertama kali jalan)
        status_sistem = fallbackStaticRules(incoming);
      }
    }

    // Simpan ke database
    await prisma.sensorLog.create({
      data: {
        apiMentah:    incoming.api_mentah,
        gasMentah:    incoming.gas_mentah,
        suhuMentah:   incoming.suhu_mentah,
        maGas:        incoming.ma_gas,
        maSuhu:       incoming.ma_suhu,
        rorSuhu:      incoming.ror_suhu,
        statusSistem: status_sistem,
      },
    });

    return NextResponse.json({
      success: true,
      command: status_sistem,
    });

  } catch (error) {
    console.error("[POST /api/sensor] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ==========================================================
// GET — Ambil data terbaru + history 10 log dari DB
// ==========================================================
export async function GET() {
  try {
    const history = await prisma.sensorLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({
      latest: history[0] ?? null,
      history,
    });
  } catch (error) {
    console.error("[GET /api/sensor] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}