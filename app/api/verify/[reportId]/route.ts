import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Report from "@/models/Report";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();

    const report = await Report.findById(id);

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan di database." },
        { status: 404 }
      );
    }

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
