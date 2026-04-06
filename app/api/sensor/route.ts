// Made by SyK
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { buildTree, predict, TreeNode, StatusSistem, SensorRecord, autoLabel, syntheticDataset } from './c45-engine';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

let cachedTree: TreeNode | null = null;
let lastTrainingTime = 0;
const RETRAIN_INTERVAL_MS = 5 * 60 * 1000; 

async function getOrTrainTree(): Promise<TreeNode | null> {
  const now = Date.now();
  if (cachedTree && (now - lastTrainingTime < RETRAIN_INTERVAL_MS)) return cachedTree;

  try {
    // Kombinasi data pengalaman lab (DB) dan data teori (Simulasi)
    const historyData = await prisma.sensorLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
    const dbSet: SensorRecord[] = historyData.map(log => ({
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

    const combinedSet = [...syntheticDataset, ...dbSet];
    cachedTree = buildTree(combinedSet);
    lastTrainingTime = now;
    console.log(`[AI] Retrain Sukses! (Data: ${combinedSet.length})`);
    return cachedTree;
  } catch (error) {
    console.error("[AI] Error training:", error);
    return cachedTree; 
  }
}

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

    // 1. FAIL-SAFE MUTLAK (Hanya untuk kondisi kiamat, jangan pakai batas sempit biar AI kerja)
    if (incoming.api_mentah < 1000 || incoming.ma_suhu >= 55.0) {
      status_sistem = "DANGER";
    } 
    else {
      // 2. AI C4.5 MACHINE LEARNING (Fokus Skripsi Lu)
      // Mesin bakal mengevaluasi relasi antara Suhu, Gas, dan Rate of Rise
      const tree = await getOrTrainTree();
      
      if (tree && !tree.isLeaf) { 
        status_sistem = predict(tree, incoming).status;
      } else {
        // Fallback statis cuma kepanggil kalau memori AI nge-blank
        if (incoming.ma_suhu > 45 || incoming.ror_suhu > 0.8) status_sistem = "DANGER";
        else if (incoming.ma_gas > 800 || incoming.ror_suhu > 0.2) status_sistem = "WARNING";
        else status_sistem = "NORMAL";
      }
    }

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

    return NextResponse.json({ success: true, command: status_sistem });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const history = await prisma.sensorLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
    return NextResponse.json({ latest: history[0] ?? null, history });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}