import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Fungsi untuk GET (Mengambil satu dokumen berdasarkan ID)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const riwayatItem = await prisma.riwayat.findUnique({
      where: { id },
    });

    if (!riwayatItem) {
      return NextResponse.json({ message: "Dokumen tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(riwayatItem);
  } catch (error) {
    console.error("Error fetching single riwayat:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}

// Fungsi untuk PUT (Memperbarui dokumen berdasarkan ID)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    // Ambil semua data yang relevan dari body
    const { nomor, judul, dataForm } = body;

    const updatedRiwayat = await prisma.riwayat.update({
      where: { id },
      data: {
        nomor,
        judul,
        dataForm,
        // updatedAt akan diperbarui secara otomatis oleh Prisma
      },
    });

    return NextResponse.json(updatedRiwayat);
  } catch (error) {
    console.error("Error updating riwayat:", error);
    return NextResponse.json({ message: "Terjadi kesalahan saat memperbarui riwayat" }, { status: 500 });
  }
}
