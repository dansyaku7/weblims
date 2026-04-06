import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. UBAH TIPE MENJADI PROMISE
) {
  try {
    const { id } = await params; // 2. LAKUKAN AWAIT SEBELUM MENGAMBIL ID

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

      // Pastikan casting type ini sesuai dengan struktur JSON di database lu
      const coverData = report.coverData as { nomorFpps?: string };
      const nomorFpps = coverData?.nomorFpps; // Tambahkan optional chaining untuk keamanan

      if (nomorFpps) {
        await tx.fpps.update({
          where: { nomorFpps },
          data: { status },
        });
      }

      return report;
    });

    // Revalidate library setelah transaksi sukses
    revalidatePath("/library");

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error: any) {
    // Memindahkan console.error ke dalam block catch agar kita tetap bisa log error meskipun ID gagal di-await
    console.error("API Status Update Error:", error); 
    return NextResponse.json(
      { success: false, error: error.message || "Gagal mengupdate status" },
      { status: 500 }
    );
  }
}