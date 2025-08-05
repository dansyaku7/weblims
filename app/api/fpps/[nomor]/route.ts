import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET tidak berubah
export async function GET(req: Request, { params }: { params: { nomor: string } }) {
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
export async function PUT(request: Request, { params }: { params: { nomor: string } }) {
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


// MENGHAPUS DATA FPPS (INI BAGIAN YANG DIPERBAIKI)
export async function DELETE(req: Request, { params }: { params: { nomor: string } }) {
  const nomorToDelete = params.nomor;

  try {
    // Gunakan transaksi untuk memastikan kedua operasi (hapus anak & induk) berhasil
    const result = await prisma.$transaction(async (tx) => {
      
      // 1. Hapus semua 'RincianUji' yang terhubung dengan 'Fpps' ini
      //    Kita mencari relasi 'fpps' yang memiliki 'nomorFpps' yang sesuai.
      await tx.rincianUji.deleteMany({
        where: {
          fpps: {
            nomorFpps: nomorToDelete,
          },
        },
      });

      // 2. Setelah 'anak'nya dihapus, baru hapus 'Fpps' induknya
      const deletedFpps = await tx.fpps.delete({
        where: {
          nomorFpps: nomorToDelete,
        },
      });

      return deletedFpps;
    });

    return NextResponse.json({ message: `FPPS ${result.nomorFpps} berhasil dihapus` }, { status: 200 });

  } catch (error: any) {
    console.error(`Delete FPPS Error (nomor: ${nomorToDelete}):`, error);
    
    // Memberikan pesan error yang lebih spesifik jika data tidak ditemukan
    if (error.code === 'P2025') {
        return NextResponse.json({ message: `Gagal menghapus: FPPS dengan nomor ${nomorToDelete} tidak ditemukan.` }, { status: 404 });
    }

    return NextResponse.json({ message: "Gagal menghapus data FPPS dari server." }, { status: 500 });
  }
}