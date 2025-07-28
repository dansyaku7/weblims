import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // <-- 1. IMPORT INI

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json(
        { success: false, error: "Status baru harus disertakan" },
        { status: 400 }
      );
    }

    const updatedReport = await prisma.$transaction(async (tx) => {
      const report = await tx.report.update({
        where: { id },
        data: { status },
      });

      if (!report) {
        throw new Error("Laporan tidak ditemukan");
      }

      const coverData = report.coverData as { nomorFpps?: string };
      const nomorFpps = coverData.nomorFpps;

      if (nomorFpps) {
        await tx.fpps.update({
          where: { nomorFpps },
          data: { status },
        });
      }

      return report;
    });

    // 2. TAMBAHKAN BARIS INI SETELAH TRANSAKSI SUKSES
    revalidatePath("/library");

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error: any) {
    console.error(`API Status Update Error (id: ${id}):`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengupdate status" },
      { status: 500 }
    );
  }
}