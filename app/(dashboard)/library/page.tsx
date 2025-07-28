import { getAllReports } from "@/lib/report-service";
import { ReportListClient } from "./components/ReportListClient";

export default async function DataLibraryPage() {
  // Panggil langsung fungsi service-nya, tidak ada lagi fetch.
  const result = await getAllReports();

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Library</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola semua laporan yang telah disimpan.
        </p>
      </div>
      {/* Kirim hasilnya ke Client Component */}
      <ReportListClient initialReportsResult={result} />
    </div>
  );
}