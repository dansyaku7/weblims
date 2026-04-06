import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Explicitly await the params promise
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Laporan tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Explicitly await the params promise
    const body = await request.json();
    const updatedReport = await prisma.report.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengupdate laporan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Explicitly await the params promise
    await prisma.report.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Laporan berhasil dihapus.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus laporan" },
      { status: 500 }
    );
  }
}