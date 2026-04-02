// import { NextResponse } from 'next/server';

// let sensorHistory: any[] = [];
// let latestData = {
//   api_mentah: 4095,
//   gas_mentah: 0,
//   suhu_mentah: 0.0,
//   ma_gas: 0,
//   ma_suhu: 0.0,
//   ror_suhu: 0.0,
//   status_sistem: "NORMAL",
//   last_update: new Date().toISOString()
// };

// // ==========================================================
// // MESIN INFERENCE HYBRID (C4.5 Dhea + Fail-Safe Abdan)
// // ==========================================================
// function evaluateC45Rules(data: any): string {
//   const { ma_suhu, ror_suhu, ma_gas, api_mentah } = data;

//   if (api_mentah < 1500) {
//     console.log("[AI] EKSEKUSI FAIL-SAFE: Api kasat mata terdeteksi! -> DANGER");
//     return "DANGER"; 
//   }

//   if (ma_suhu <= 43.50) {
//     if (ror_suhu <= 0.10) {
//       if (ma_gas <= 645.00) {
//         console.log("[AI] C4.5: Kondisi murni normal. -> NORMAL");
//         return "NORMAL";
//       } else {
//         console.log("[AI] C4.5: Suhu aman, tapi Gas/Asap tinggi! -> WARNING");
//         return "WARNING";
//       }
//     } else {
//       console.log("[AI] C4.5: RoR Suhu melonjak drastis! -> WARNING");
//       return "WARNING"; 
//     }
//   } else {
//     console.log("[AI] C4.5: Suhu rata-rata tembus batas ekstrem! -> DANGER");
//     return "DANGER";      
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const payload = await request.json();
    
//     // Update data terkini
//     latestData = {
//       ...latestData,
//       api_mentah: payload.api_mentah ?? latestData.api_mentah,
//       gas_mentah: payload.gas_mentah ?? latestData.gas_mentah,
//       suhu_mentah: payload.suhu_mentah ?? latestData.suhu_mentah,
//       ma_gas: payload.ma_gas ?? latestData.ma_gas,
//       ma_suhu: payload.ma_suhu ?? latestData.ma_suhu,
//       ror_suhu: payload.ror_suhu ?? latestData.ror_suhu,
//     };

//     // Eksekusi Mesin Hybrid
//     latestData.status_sistem = evaluateC45Rules(latestData);
//     latestData.last_update = new Date().toISOString();

//     // Masukkan ke riwayat log (Maksimal 10 log)
//     sensorHistory.unshift({ ...latestData });
//     if (sensorHistory.length > 10) {
//       sensorHistory.pop(); 
//     }

//     // Balas ESP32 dengan instruksi
//     return NextResponse.json({ 
//       success: true, 
//       command: latestData.status_sistem 
//     });
    
//   } catch (error) {
//     return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({
//     latest: latestData,
//     history: sensorHistory
//   });
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function evaluateC45Rules(data: {
  api_mentah: number;
  ma_suhu: number;
  ror_suhu: number;
  ma_gas: number;
}): string {
  const { ma_suhu, ror_suhu, ma_gas, api_mentah } = data;

  if (api_mentah < 1500) {
    console.log("[AI] EKSEKUSI FAIL-SAFE: Api kasat mata terdeteksi! -> DANGER");
    return "DANGER";
  }

  if (ma_suhu <= 43.50) {
    if (ror_suhu <= 0.10) {
      if (ma_gas <= 645.00) {
        console.log("[AI] C4.5: Kondisi murni normal. -> NORMAL");
        return "NORMAL";
      } else {
        console.log("[AI] C4.5: Suhu aman, tapi Gas/Asap tinggi! -> WARNING");
        return "WARNING";
      }
    } else {
      console.log("[AI] C4.5: RoR Suhu melonjak drastis! -> WARNING");
      return "WARNING";
    }
  } else {
    console.log("[AI] C4.5: Suhu rata-rata tembus batas ekstrem! -> DANGER");
    return "DANGER";
  }
}

// ==========================================================
// POST — Terima data dari ESP32, simpan ke DB
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

    const status_sistem = evaluateC45Rules(incoming);

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
    // Ambil 10 log terbaru
    const history = await prisma.sensorLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Data terbaru = index 0
    const latest = history[0] ?? null;

    return NextResponse.json({
      latest,
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