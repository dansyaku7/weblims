import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// MENGAMBIL DATA FPPS TERTENTU
export async function GET(req, { params }) {
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

// UPDATE DATA FPPS
export async function PUT(request, { params }) {
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

// MENGHAPUS DATA FPPS
export async function DELETE(req, { params }) {
  const nomorToDelete = params.nomor;
  try {
    await prisma.fpps.delete({
      where: { nomorFpps: nomorToDelete },
    });

    return NextResponse.json(
      { message: "FPPS berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete FPPS Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus data FPPS" },
      { status: 500 }
    );
  }
}
