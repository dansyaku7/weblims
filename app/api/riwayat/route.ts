import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Menggunakan default import

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

    // --- PERBAIKAN DIMULAI DI SINI ---
    // 1. Cek apakah dokumen dengan nomor yang sama sudah ada
    const existingRiwayat = await prisma.riwayat.findUnique({
      where: {
        nomor: nomor,
      },
    });

    // 2. Jika sudah ada, kembalikan error yang jelas
    if (existingRiwayat) {
      return NextResponse.json(
        { message: `Dokumen dengan nomor "${nomor}" sudah ada di riwayat.` },
        { status: 409 } // 409 Conflict adalah status yang tepat untuk ini
      );
    }
    // --- PERBAIKAN SELESAI ---

    // 3. Jika belum ada, buat entri baru
    const newRiwayat = await prisma.riwayat.create({
      data: {
        tipe,
        nomor,
        judul,
        dataForm,
      },
    });

    return NextResponse.json(newRiwayat, { status: 201 });
  } catch (error) {
    console.error("Error creating riwayat:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server saat membuat riwayat" },
      { status: 500 }
    );
  }
}

// Handler untuk GET (mengambil semua data riwayat)
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
