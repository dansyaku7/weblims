// File: app/(dashboard)/library/page.tsx

import { getAllReports } from "@/lib/report-service";
import { ReportListClient } from "./components/ReportListClient";
import { getUserFromSession } from "@/lib/session";

export const dynamic = 'force-dynamic';

export default async function DataLibraryPage() {
  try {
    const user = await getUserFromSession();
    // 1. Pastikan undefined jadi null biar aman saat di-passing ke Client Component
    const userRole = user?.role || null; 
    
    console.log("ROLE YANG TERBACA DI SERVER:", userRole);

    const rawResult = await getAllReports();

    // 2. STRATEGI SERIALIZATION (KRUSIAL)
    // rawResult berisi { success: true, data: [...] }. Di dalam array data, 
    // Prisma mengembalikan tipe Date. JSON.parse + JSON.stringify ini 
    // akan mengubah semua tipe Date menjadi String secara paksa dan aman.
    const result = JSON.parse(JSON.stringify(rawResult));

    return (
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Data Library v2</h1>
          <p className="text-muted-foreground mt-1">
            Lihat dan kelola semua laporan yang telah disimpan.
          </p>
        </div>
        <ReportListClient initialReportsResult={result} userRole={userRole} />
      </div>
    );
  } catch (error) {
    // 3. Fallback UI & Error Logging
    // Mencegah halaman blank putih (atau error digest 500) jika koneksi database putus
    console.error("Error loading DataLibraryPage:", error);

    return (
      <div className="p-8 text-center text-red-500">
        <h2 className="text-xl font-bold">Gagal memuat data</h2>
        <p>Terjadi kesalahan pada server saat memproses halaman ini.</p>
      </div>
    );
  }
}