import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/prisma"; // Nama file ini mungkin perlu diganti jika tidak pakai prisma
import Report from "@/models/Report";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();

    // --- BAGIAN INI YANG DIUBAH ---
    // Jangan gunakan findById. Gunakan findOne untuk mencari di field spesifik.
    // GANTI 'reportId' DENGAN NAMA FIELD YANG BENAR DI MODEL MONGOOSE KAMU
    const report = await Report.findOne({ reportId: id });
    // -----------------------------

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan di database." },
        { status: 404 }
      );
    }

    // Ambil data yang ingin ditampilkan saat verifikasi berhasil
    const verificationData = {
      certificateNo: report.coverData?.certificateNo || "-",
      customer: report.coverData?.customer || "-",
      reportDate: report.coverData?.reportDate || "-",
      nomorFpps: report.coverData?.nomorFpps || "-",
    };

    return NextResponse.json({ success: true, data: verificationData });
  } catch (error) {
    console.error("Verification API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "ID laporan tidak valid atau terjadi kesalahan server.",
      },
      { status: 500 }
    );
  }
}