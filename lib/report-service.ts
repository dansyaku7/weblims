import prisma from "@/lib/prisma";

export async function getAllReports() {
  try {
    // 1. Ambil semua laporan (DITAMBAHKAN FILTER WHERE)
    // Hanya ambil yang sudah disentuh oleh CoA Builder
    const reports = await prisma.report.findMany({
      where: {
        status: {
          in: ["sertifikat", "analisis", "selesai"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2. Kumpulkan semua Nomor FPPS dari JSON coverData
    // Kita butuh array string: ["DIL-112333", "DIL-112334", ...]
    const fppsNumbers = reports
      .map((report: any) => report.coverData?.nomorFpps)
      .filter((no): no is string => typeof no === "string"); // Filter biar cuma string yang valid

    // 3. Ambil data TERBARU dari table FPPS berdasarkan nomor tadi
    // Kita cuma ambil kolom nomorFpps dan namaPelanggan biar ringan
    const fppsData = await prisma.fpps.findMany({
      where: {
        nomorFpps: {
          in: fppsNumbers,
        },
      },
      select: {
        nomorFpps: true,
        namaPelanggan: true, // <-- INI YANG KITA BUTUHKAN (NAMA BARU: PT Jibb)
      },
    });

    // 4. Gabungkan (Merge) data Report dengan nama Customer terbaru
    const reportsWithFreshData = reports.map((report: any) => {
      // Cari data FPPS yang cocok buat report ini
      const matchingFpps = fppsData.find(
        (f) => f.nomorFpps === report.coverData?.nomorFpps
      );

      // Kalau ketemu data aslinya, kita TIMPA nama customer di coverData
      // dengan nama yang ada di Master FPPS (namaPelanggan)
      if (matchingFpps && matchingFpps.namaPelanggan) {
        return {
          ...report,
          coverData: {
            ...report.coverData,
            customer: matchingFpps.namaPelanggan, // Inject nama terbaru (PT Jibb)
          },
        };
      }

      // Kalau gak ketemu (misal FPPS udah dihapus), pake data lama aja
      return report;
    });

    return { success: true, data: reportsWithFreshData };
  } catch (error) {
    console.error("Database Error (getAllReports):", error);
    return { success: false, error: "Gagal mengambil data dari database." };
  }
}