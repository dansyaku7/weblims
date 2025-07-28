// File: app/(dashboard)/library/page.tsx

import { getAllReports } from "@/lib/report-service";
import { ReportListClient } from "./components/ReportListClient";
import { getUserFromSession } from "@/lib/session";

export const dynamic = 'force-dynamic';

export default async function DataLibraryPage() {
  const user = await getUserFromSession();
  const userRole = user?.role;
  
  console.log("ROLE YANG TERBACA DI SERVER:", userRole);

  const result = await getAllReports();

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        {/* --> UBAH BARIS DI BAWAH INI <-- */}
        <h1 className="text-3xl font-bold">Data Library v2</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola semua laporan yang telah disimpan.
        </p>
      </div>
      <ReportListClient initialReportsResult={result} userRole={userRole} />
    </div>
  );
}