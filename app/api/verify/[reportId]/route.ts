// Lokasi file: app/api/verify/[reportId]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  // 1. UBAH 'id' MENJADI 'reportId' AGAR SESUAI NAMA FOLDER
  { params }: { params: { reportId: string } } 
) {
  // 2. GUNAKAN 'reportId' UNTUK MENGAMBIL NILAI DARI PARAMS
  const { reportId } = params;

  // Pengecekan sekarang menggunakan variabel yang benar
  if (!reportId) {
    return NextResponse.json(
      { success: false, error: "ID Laporan tidak boleh kosong." },
      { status: 400 }
    );
  }

  try {
    const report = await prisma.report.findFirst({
      where: {
        // 3. GUNAKAN 'reportId' DI DALAM QUERY
        id: reportId, 
        status: "selesai",
      },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Sertifikat tidak valid atau belum final." },
        { status: 404 }
      );
    }

    const coverData: any = report.coverData;
    const verificationData = {
      certificateNo: coverData?.certificateNo || "N/A",
      customer: coverData?.customer || "N/A",
      reportDate: coverData?.reportDate || "N/A",
      nomorFpps: coverData?.nomorFpps || "N/A",
    };

    return NextResponse.json({ success: true, data: verificationData });

  } catch (error) {
    console.error("Verification API Error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}