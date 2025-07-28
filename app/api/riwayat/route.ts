import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // 1. Import revalidatePath
import prisma from "@/lib/prisma";

// Handler untuk POST (menyimpan riwayat baru)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipe, nomor, judul, dataForm } = body;

    if (!tipe || !nomor || !judul) {
      return NextResponse.json(
        { message: "Tipe, nomor, dan judul diperlukan" },
        { status: 400 }
      );
    }
    
    const existingRiwayat = await prisma.riwayat.findUnique({
      where: { nomor: nomor },
    });

    if (existingRiwayat) {
      return NextResponse.json(
        { message: `Dokumen dengan nomor "${nomor}" sudah ada.` },
        { status: 409 }
      );
    }

    const newRiwayat = await prisma.riwayat.create({
      data: { tipe, nomor, judul, dataForm },
    });

    // 2. Bersihkan cache untuk halaman riwayat
    revalidatePath('/riwayat');
    revalidatePath('/(dashboard)/riwayat', 'layout'); // Membersihkan cache layout juga

    return NextResponse.json(newRiwayat, { status: 201 });
  } catch (error) {
    console.error("Error creating riwayat:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server saat membuat riwayat" },
      { status: 500 }
    );
  }
}

// Handler untuk GET (tidak berubah)
export async function GET() {
  try {
    const riwayatItems = await prisma.riwayat.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(riwayatItems);
  } catch (error) {
    console.error("Error fetching riwayat:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data riwayat" },
      { status: 500 }
    );
  }
}
