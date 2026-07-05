import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Mencegah instansiasi Prisma berulang di mode development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ENDPOINT GET: Dipanggil oleh Frontend (Dashboard) setiap 2 detik
export async function GET() {
  try {
    // Ambil 1 data paling baru untuk Stat Cards
    const latest = await prisma.sensorLog.findFirst({
      orderBy: { createdAt: "desc" },
    });

    // Ambil 50 data terakhir untuk Monitoring Table
    const history = await prisma.sensorLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ latest, history }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// ENDPOINT POST: Dipanggil oleh ESP32 setiap 2 detik
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Pastikan data diformat ke angka yang benar
    const co2 = parseFloat(body.co2);
    const o2 = parseFloat(body.o2);

    // Proteksi data kosong atau tidak valid
    if (isNaN(co2) || isNaN(o2)) {
      return NextResponse.json({ error: "Payload tidak valid, pastikan format angka benar" }, { status: 400 });
    }

    // Evaluasi Logika Status (Centralized Logic di Backend)
    let statusSistem = "NORMAL";
    
    if (o2 <= 195000) {
      // Oksigen menipis ke level berbahaya
      statusSistem = "BAHAYA";
    } else if (co2 >= 1000) {
      // Kualitas udara buruk / pengap
      statusSistem = "WASPADA";
    }

    // Simpan ke database MySQL
    const newLog = await prisma.sensorLog.create({
      data: {
        co2: co2,
        o2: o2,
        statusSistem: statusSistem,
      },
    });

    return NextResponse.json({ success: true, data: newLog }, { status: 201 });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}