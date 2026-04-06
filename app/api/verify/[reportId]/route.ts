import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Tipe params sebagai Promise sesuai aturan Next.js App Router terbaru
interface RouteParams {
  params: Promise<{ reportId: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  // WAJIB di-await sebelum diekstrak
  const resolvedParams = await params;
  const { reportId } = resolvedParams;

  if (!reportId) {
    return NextResponse.json(
      { success: false, error: "ID Laporan tidak boleh kosong." },
      { status: 400 }
    );
  }

  try {
    const report = await prisma.report.findFirst({
      where: {
        id: reportId, 
        // Catatan: Pastikan status laporan di database lo beneran "selesai"
        status: "selesai",
      },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Sertifikat tidak valid atau belum final." },
        { status: 404 }
      );
    }

    const coverData: any = report.coverData || {};
    const verificationData = {
      certificateNo: coverData.certificateNo || "N/A",
      customer: coverData.customer || "N/A",
      reportDate: coverData.reportDate || "N/A",
      nomorFpps: coverData.nomorFpps || "N/A",
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