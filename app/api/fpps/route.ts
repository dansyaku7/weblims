import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { formData, rincian } = body;

    // Menggunakan Transaction agar jika salah satu gagal, semua dibatalkan
    const newFpps = await prisma.$transaction(async (tx) => {
      // 1. Buat data FPPS
      const fpps = await tx.fpps.create({
        data: {
          ...formData,
          rincian: {
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

      // 2. STRATEGI: Buat Draft Report Otomatis
      // Karena halaman Library membaca tabel Report, kita harus inject data 
      // Report awal di sini agar langsung muncul di UI.
      // (Sesuaikan default value di bawah dengan skema Prisma lu)
      await tx.report.create({
        data: {
          coverData: { 
            nomorFpps: fpps.nomorFpps,
            // Tambahkan field default lain yang dibutuhkan schema json lu
          },
          // misal: status: "DRAFT",
        }
      });

      return fpps;
    });

    // 3. Hancurkan cache agar klien langsung melihat data terbaru tanpa perlu F5
    revalidatePath('/(dashboard)/library', 'page'); 
    // Jika path lu bukan route group, gunakan: revalidatePath('/library');

    return NextResponse.json(
      { message: "FPPS dan Draft Report berhasil disimpan", data: newFpps },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("FPPS Save Error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: `Nomor FPPS '${body.formData.nomorFpps}' sudah ada.` },
        { status: 409 } 
      );
    }

    return NextResponse.json(
      { message: "Gagal menyimpan FPPS", error: error.message },
      { status: 500 }
    );
  }
}