import { ReportListClient } from "./components/ReportListClient";

async function getReports() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/reports`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { success: false, error: "Gagal memuat data." };
    }
    return response.json();
  } catch (error) {
    return { success: false, error: "Terjadi kesalahan jaringan." };
  }
}

export default async function DataLibraryPage() {
  const result = await getReports();

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Library</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola semua laporan yang telah disimpan.
        </p>
      </div>
      <ReportListClient initialReportsResult={result} />
    </div>
  );
}
