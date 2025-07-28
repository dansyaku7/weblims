import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handler untuk POST (menyimpan riwayat baru)
// Ini sudah ada dari langkah sebelumnya
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

    const newRiwayat = await prisma.riwayat.create({
      data: {
        tipe,
        nomor,
        judul,
        dataForm, // dataForm disimpan sebagai JSON
      },
    });

    return NextResponse.json(newRiwayat, { status: 201 });
  } catch (error) {
    console.error("Error creating riwayat:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

// Handler untuk GET (mengambil semua data riwayat)
// Tambahkan fungsi ini ke file yang sama
export async function GET() {
  try {
    const riwayatItems = await prisma.riwayat.findMany({
      // Mengurutkan berdasarkan tanggal dibuat, yang terbaru di atas
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
