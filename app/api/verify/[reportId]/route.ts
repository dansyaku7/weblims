// Lokasi file: app/api/verify/[reportId]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID Laporan tidak boleh kosong." },
      { status: 400 }
    );
  }

  try {
    // --- LOGIKA PRISMA YANG SUDAH FINAL ---
    const report = await prisma.report.findFirst({
      where: {
        id: id,             // Mencari berdasarkan field 'id' yang benar
        status: "selesai",  // DAN statusnya harus "selesai"
      },
    });
    // ------------------------------------

    // Jika tidak ditemukan (karena ID salah atau status belum 'selesai')
    if (!report) {
      return NextResponse.json(
        { success: false, error: "Sertifikat tidak valid atau belum final." },
        { status: 404 }
      );
    }

    // Jika ditemukan, kirim data yang diperlukan untuk ditampilkan
    const coverData: any = report.coverData; // Mengambil data JSON

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