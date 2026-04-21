// Made by SyK
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { predict, TreeNode, StatusSistem } from '../../lib/c45_engine'; // Pastikan path ini bener sesuai folder lu
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

let cachedTree: TreeNode | null = null;
let lastLoadTime = 0;
// Reload model JSON tiap 5 menit buat jaga-jaga lu abis retraining di background
const RELOAD_INTERVAL_MS = 5 * 60 * 1000; 

function getTree(): TreeNode | null {
  const now = Date.now();
  if (cachedTree && (now - lastLoadTime < RELOAD_INTERVAL_MS)) {
    return cachedTree;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'model_tree.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    cachedTree = JSON.parse(fileData) as TreeNode;
    lastLoadTime = now;
    console.log("[AI] Model C4.5 Berhasil Di-load dari model_tree.json!");
    return cachedTree;
  } catch (error) {
    console.error("[AI] Gagal load model_tree.json. Pastikan script train_c45.js udah dijalanin:", error);
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

    // 1. FAIL-SAFE MUTLAK (Analog bounds)
    if (incoming.api_mentah < 1000 || incoming.ma_suhu >= 55.0) {
      status_sistem = "BAHAYA";
    } 
    else {
      // 2. AI C4.5 PREDICTION
      const tree = getTree();
      
      if (tree && !tree.isLeaf) { 
        status_sistem = predict(tree, incoming).status;
      } else {
        // Fallback statis kalau file JSON belum ada
        if (incoming.ma_suhu > 45 || incoming.ror_suhu > 0.8) status_sistem = "BAHAYA";
        else if (incoming.ma_gas > 800 || incoming.ror_suhu > 0.2) status_sistem = "WASPADA";
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