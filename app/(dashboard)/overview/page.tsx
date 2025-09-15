import prisma from "@/lib/prisma";
import { DataTable } from "./components/DataTable";
import { SectionCards } from "./components/SectionCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const allData = await prisma.fpps.findMany({
    // --- PERBAIKAN 1: Ambil formData dari Prisma ---
    select: {
      id: true,
      nomorFpps: true,
      formData: true, // Ambil semua data yang ada di dalam kolom formData
      status: true,
    },
    // --- AKHIR PERBAIKAN 1 ---
  });

  const totalClients = new Set(allData.map((item) => (item.formData as any).namaPelanggan)).size;

  const onProgressCount = allData.filter(
    (item) => item.status?.toLowerCase() !== "selesai"
  ).length;

  const finalCoaCount = allData.filter(
    (item) => item.status?.toLowerCase() === "selesai"
  ).length;

  const dataForTable = allData.map((item) => {
    // Pastikan untuk menangani jika formData null atau undefined
    const formData = (item.formData as any) || {};
    
    // --- PERBAIKAN 2: Akses data dari dalam item.formData ---
    return {
      id: item.id.toString(),
      nomorFpps: item.nomorFpps,
      header: formData.namaPelanggan || "",
      ppic: formData.namaPpic || "",
      email: formData.emailPpic || "",
      noTelp: formData.noTelp || "",
      status: item.status || "pendaftaran",
    };
    // --- AKHIR PERBAIKAN 2 ---
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Tabel Pelanggan</h1>
      </div>

      <SectionCards
        totalClients={totalClients}
        onProgress={onProgressCount}
        finalCoa={finalCoaCount}
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            Lihat semua pelanggan yang sedang berjalan dan yang telah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={dataForTable} />
        </CardContent>
      </Card>
    </main>
  );
}