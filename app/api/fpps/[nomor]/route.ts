import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Tipe untuk parameter, agar lebih rapi
interface RouteParams {
  params: { nomor: string };
}

// GET tidak berubah
export async function GET(req: Request, { params }: RouteParams) {
  const { nomor } = params;
  try {
    const data = await prisma.fpps.findUnique({
      where: { nomorFpps: nomor },
      include: { rincian: true },
    });

    if (!data) {
      return NextResponse.json(
        { message: `FPPS ${nomor} tidak ditemukan` },
        { status: 404 }
      );
    }

    const { rincian, ...formData } = data;
    return NextResponse.json(
      {
        formData: formData,
        rincian: rincian.map((r) => ({ ...r, id: r.idRincian })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch FPPS Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data FPPS" },
      { status: 500 }
    );
  }
}

// PUT tidak berubah
export async function PUT(request: Request, { params }: RouteParams) {
  const { nomor } = params;
  try {
    const body = await request.json();

    if (body.formData && body.rincian) {
      const { formData, rincian } = body;
      const updatedFpps = await prisma.fpps.update({
        where: { nomorFpps: nomor },
        data: {
          ...formData,
          rincian: {
            deleteMany: {},
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
        { message: "Data FPPS berhasil diperbarui", data: updatedFpps },
        { status: 200 }
      );
    } else if (body.status) {
      const { status } = body;
      const updatedFpps = await prisma.fpps.update({
        where: { nomorFpps: nomor },
        data: { status },
      });
      return NextResponse.json(
        { message: "Status FPPS berhasil diperbarui", data: updatedFpps },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Payload request tidak valid" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(`API FPPS Update Error (nomor: ${nomor}):`, error);
    return NextResponse.json(
      { message: "Gagal memperbarui data", error: error.message },
      { status: 500 }
    );
  }
}


// DELETE (INI YANG SUDAH 100% BENAR SESUAI SKEMA)
export async function DELETE(request: Request, { params }: RouteParams) {
  const { nomor } = params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      
      const fppsToDelete = await tx.fpps.findUnique({
        where: { nomorFpps: nomor },
        select: { id: true },
      });

      if (!fppsToDelete) {
        throw new Error(`FPPS dengan nomor ${nomor} tidak ditemukan.`);
      }

      // =================================================================
      // NAMA MODEL SUDAH DIPERBAIKI MENJADI 'rincian'
      // SESUAI DENGAN 'model Rincian' DI schema.prisma
      // =================================================================
      await tx.rincian.deleteMany({
        where: { fppsId: fppsToDelete.id },
      });

      const deletedFpps = await tx.fpps.delete({
        where: { nomorFpps: nomor },
      });

      return deletedFpps;
    });

    return NextResponse.json({ message: `FPPS ${result.nomorFpps} berhasil dihapus` }, { status: 200 });

  } catch (error: any) {
    console.error(`Delete FPPS Error (nomor: ${nomor}):`, error);
    
    return NextResponse.json(
        { message: error.message || "Gagal menghapus data dari server." }, 
        { status: 500 }
    );
  }
}