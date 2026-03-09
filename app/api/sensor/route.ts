import { NextResponse } from 'next/server';

// Memori sementara. Wajib diganti ke Database (Supabase/MySQL) untuk produksi!
let sensorHistory: any[] = [];
let latestData = {
  api_mentah: 4095,
  gas_mentah: 0,
  suhu_mentah: 0.0,
  ma_gas: 0,
  ma_suhu: 0.0,
  ror_suhu: 0.0,
  status_sistem: "NORMAL",
  last_update: new Date().toISOString()
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // 1. Update data terkini
    latestData = {
      ...latestData,
      api_mentah: payload.api_mentah ?? latestData.api_mentah,
      gas_mentah: payload.gas_mentah ?? latestData.gas_mentah,
      suhu_mentah: payload.suhu_mentah ?? latestData.suhu_mentah,
      ma_gas: payload.ma_gas ?? latestData.ma_gas,
      ma_suhu: payload.ma_suhu ?? latestData.ma_suhu,
      ror_suhu: payload.ror_suhu ?? latestData.ror_suhu,
      last_update: new Date().toISOString()
    };

    // [TEMPAT INJEKSI LOGIKA DECISION TREE C4.5 NANTI]
    // latestData.status_sistem = hasil_c45;

    // 2. Masukkan ke riwayat (Maksimal 10 log terakhir untuk tabel)
    sensorHistory.unshift({ ...latestData });
    if (sensorHistory.length > 10) {
      sensorHistory.pop(); // Buang data paling tua
    }

    return NextResponse.json({ success: true, command: latestData.status_sistem });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid JSON Payload" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    latest: latestData,
    history: sensorHistory
  });
}