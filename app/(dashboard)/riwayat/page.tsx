import { getAllRiwayat } from "@/lib/riwayat-service";
import { RiwayatListClient } from "./components/RiwayatListClient";

export const dynamic = 'force-dynamic';

export default async function RiwayatPage() {
  // Ambil data langsung di server
  const result = await getAllRiwayat();

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Riwayat Dokumen
        </h1>
        <p className="text-muted-foreground mt-1">
          Lihat dan kelola semua dokumen yang pernah dibuat dan disimpan dalam sistem.
        </p>
      </div>
      
      {/* Kirim data ke komponen client untuk ditampilkan */}
      <RiwayatListClient initialRiwayatResult={result} />
    </div>
  );
}
