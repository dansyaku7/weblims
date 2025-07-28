import prisma from "@/lib/prisma";

export async function getAllReports() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    // Bungkus hasilnya agar formatnya konsisten
    return { success: true, data: reports };
  } catch (error) {
    console.error("Database Error (getAllReports):", error);
    // Kembalikan error dengan format yang sama
    return { success: false, error: "Gagal mengambil data dari database." };
  }
}