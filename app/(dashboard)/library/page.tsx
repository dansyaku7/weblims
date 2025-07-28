import { getAllReports } from "@/lib/report-service";
import { ReportListClient } from "./components/ReportListClient";
import { getServerSession } from "next-auth/next";
// PENTING: Pastikan path ke authOptions sudah benar sesuai project kamu
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export default async function DataLibraryPage() {
  // Mengambil data laporan dari database
  const result = await getAllReports();
  
  // --- PERUBAHAN DIMULAI DI SINI ---
  // 1. Ambil data sesi user yang sedang login di server
  const session = await getServerSession(authOptions);
  console.log("SESSION DATA:", session);
  const showCustomerName = session?.user?.role !== "ANALIS";
  // ------------------------------------

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Library</h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola semua laporan yang telah disimpan.
        </p>
      </div>
      {/* 3. Kirim hasilnya sebagai props ke Client Component */}
      <ReportListClient 
        initialReportsResult={result} 
        showCustomerName={showCustomerName} 
      />
    </div>
  );
}