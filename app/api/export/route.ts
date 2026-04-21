// Made by SyK
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const logs = await prisma.sensorLog.findMany({
      orderBy: { createdAt: 'desc' }
    });

    let csvContent = "waktu,suhu_mentah,ror_suhu,gas_mentah,api_mentah,status\n";

    logs.forEach(log => {
      const waktu = new Date(log.createdAt).toISOString();
      csvContent += `${waktu},${log.suhuMentah},${log.rorSuhu},${log.gasMentah},${log.apiMentah},${log.statusSistem}\n`;
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="sensor_raw_dataset_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal export data" }, { status: 500 });
  }
}