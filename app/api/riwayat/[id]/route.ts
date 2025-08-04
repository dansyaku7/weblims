import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

// Fungsi untuk PUT (tidak berubah)
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

    revalidatePath('/riwayat');
    revalidatePath('/(dashboard)/riwayat', 'layout');

    return NextResponse.json(updatedRiwayat);
  } catch (error) {
    console.error("Error updating riwayat:", error);
    return NextResponse.json({ message: "Terjadi kesalahan saat memperbarui riwayat" }, { status: 500 });
  }
}

// --- FUNGSI BARU UNTUK DELETE ---
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Cari dulu itemnya untuk memastikan ada
    const riwayatItem = await prisma.riwayat.findUnique({
      where: { id },
    });

    if (!riwayatItem) {
      return NextResponse.json({ error: "Dokumen tidak ditemukan" }, { status: 404 });
    }

    // Hapus dokumen dari database
    await prisma.riwayat.delete({
      where: { id },
    });

    // Bersihkan cache agar halaman riwayat di-refresh
    revalidatePath('/riwayat');
    revalidatePath('/(dashboard)/riwayat', 'layout');

    return NextResponse.json({ success: true, message: "Dokumen berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting riwayat:", error);
    return NextResponse.json({ error: "Gagal menghapus data di server" }, { status: 500 });
  }
}
