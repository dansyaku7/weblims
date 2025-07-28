// File: app/(dashboard)/library/page.tsx

import { getAllReports } from "@/lib/report-service";
import { ReportListClient } from "./components/ReportListClient";
import { getUserFromSession } from "@/lib/session"; // <-- Import helper sesi

export default async function DataLibraryPage() {
  // Ambil data user dan role-nya dari sesi
  const user = await getUserFromSession();
  const userRole = user?.role;

  const result = await getAllReports();

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Library</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola semua laporan yang telah disimpan.
        </p>
      </div>
      {/* Kirim hasil dan userRole sebagai props */}
      <ReportListClient initialReportsResult={result} userRole={userRole} />
    </div>
  );
}