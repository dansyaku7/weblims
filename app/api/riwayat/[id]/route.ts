import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // 1. Import revalidatePath
import prisma from "@/lib/prisma";

// Fungsi untuk GET (tidak berubah)
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
    const { nomor, judul, dataForm } = body;

    const updatedRiwayat = await prisma.riwayat.update({
      where: { id },
      data: {
        nomor,
        judul,
        dataForm,
      },
    });

    // 2. Bersihkan cache untuk halaman riwayat
    revalidatePath('/riwayat');
    revalidatePath('/(dashboard)/riwayat', 'layout'); // Membersihkan cache layout juga

    return NextResponse.json(updatedRiwayat);
  } catch (error) {
    console.error("Error updating riwayat:", error);
    return NextResponse.json({ message: "Terjadi kesalahan saat memperbarui riwayat" }, { status: 500 });
  }
}
