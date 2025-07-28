import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// Import fungsi service yang baru
import { getAllReports } from "@/lib/report-service";

// --- FUNGSI GET DIUBAH ---
export async function GET() {
  const result = await getAllReports();

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: result.data });
}

// --- FUNGSI POST TETAP SAMA ---
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const savedReport = await prisma.report.create({
      data: body,
    });

    return NextResponse.json(
      { success: true, data: savedReport },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan laporan baru" },
      { status: 500 }
    );
  }
}