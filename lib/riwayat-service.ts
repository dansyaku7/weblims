import prisma from "@/lib/prisma";

// Tipe untuk hasil yang akan dikembalikan
export interface RiwayatResult {
  success: boolean;
  data?: any[];
  error?: string;
}

/**
 * Mengambil semua data riwayat dari database, diurutkan dari yang terbaru.
 */
export async function getAllRiwayat(): Promise<RiwayatResult> {
  try {
    const riwayatItems = await prisma.riwayat.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: riwayatItems };
  } catch (error) {
    console.error("Error fetching riwayat from service:", error);
    return { success: false, error: "Gagal mengambil data riwayat dari database." };
  }
}
