import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  // Deklarasikan body di sini agar bisa diakses di blok catch
  const body = await req.json();

  try {
    const { formData, rincian } = body;

    // Prisma: Membuat data Fpps baru beserta Rincian-nya sekaligus
    const newFpps = await prisma.fpps.create({
      data: {
        ...formData, // Semua data dari formData
        rincian: {
          // Buat data Rincian yang terhubung
          create: rincian.map((item: any) => ({
            idRincian: item.id,
            area: item.area,
            matriks: item.matriks,
            parameter: item.parameter,
            regulasi: item.regulasi,
            metode: item.metode,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "FPPS berhasil disimpan", data: newFpps },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("FPPS Save Error:", error);

    // Prisma: Error code untuk unique constraint violation adalah P2002
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Akses formData dari body yang sudah dideklarasikan di luar try
      return NextResponse.json(
        { message: `Nomor FPPS '${body.formData.nomorFpps}' sudah ada.` },
        { status: 409 } // 409 Conflict
      );
    }

    return NextResponse.json(
      { message: "Gagal menyimpan FPPS", error: error.message },
      { status: 500 }
    );
  }
}
