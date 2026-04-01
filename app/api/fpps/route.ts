import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { formData, rincian } = body;

    const newFpps = await prisma.$transaction(async (tx) => {
      // 1. Buat data FPPS beserta Rinciannya
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

      // 2. Inject otomatis ke tabel Report menyesuaikan strict schema lu
      await tx.report.create({
        data: {
          id: randomUUID(), // Wajib diisi manual karena schema tidak ada @default
          coverData: { 
            nomorFpps: fpps.nomorFpps,
          },
          activeTemplates: [], // Wajib diisi karena schema bertipe Json (bukan Json?)
          // Kolom 'status' tidak perlu diisi karena schema sudah punya @default(pendaftaran)
        }
      });

      return fpps;
    });

    // 3. Clear cache halaman library agar data baru langsung muncul
    revalidatePath('/(dashboard)/library', 'page');
    revalidatePath('/library'); // Memastikan path reguler juga di-clear

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
        { message: `Nomor FPPS '${body.formData?.nomorFpps}' sudah ada.` },
        { status: 409 } 
      );
    }

    return NextResponse.json(
      { message: "Gagal menyimpan FPPS", error: error.message },
      { status: 500 }
    );
  }
}