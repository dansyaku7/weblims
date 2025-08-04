"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Pencil, Trash2 } from "lucide-react"; // Ganti FileText dengan Trash2
import { RiwayatResult } from "@/lib/riwayat-service";
import { toast } from "sonner";

interface RiwayatItem {
  id: string;
  tipe: string;
  nomor: string;
  judul: string;
  createdAt: string;
  dataForm: any;
}

interface RiwayatListClientProps {
  initialRiwayatResult: RiwayatResult;
}

export function RiwayatListClient({ initialRiwayatResult }: RiwayatListClientProps) {
  const router = useRouter();
  const [riwayat, setRiwayat] = useState<RiwayatItem[]>(initialRiwayatResult.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // State untuk loading saat hapus

  const filteredRiwayat = useMemo(() => {
    if (!searchTerm) return riwayat;
    return riwayat.filter(
      (item) =>
        item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [riwayat, searchTerm]);

  // --- FUNGSI handleLihatDetail DIHAPUS DAN DIGANTI DENGAN handleRemove ---
  const handleRemove = async (item: RiwayatItem) => {
    // Tampilkan konfirmasi sebelum menghapus
    if (!window.confirm(`Apakah Anda yakin ingin menghapus dokumen "${item.nomor}"?`)) {
      return;
    }

    setIsDeleting(item.id);
    try {
      // Panggil API endpoint untuk menghapus
      const response = await fetch(`/api/riwayat/${item.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus dokumen dari server.");
      }

      // Hapus item dari state lokal agar UI terupdate
      setRiwayat((prevRiwayat) => prevRiwayat.filter((r) => r.id !== item.id));
      toast.success(`Dokumen "${item.nomor}" berhasil dihapus.`);

    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsDeleting(null);
    }
  };
  // --------------------------------------------------------------------

  const handleEdit = (item: RiwayatItem) => {
    let path = "";
    if (item.tipe === "surat_tugas") {
      path = "/surat";
    } else if (item.tipe === "surat_pengujian") {
      path = "/pengujian";
    } else if (item.tipe === "berita_acara") {
      path = "/berita";
    } else {
      toast.error(`Tipe dokumen "${item.tipe}" tidak bisa diedit.`);
      return;
    }
    router.push(`${path}?id=${item.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!initialRiwayatResult.success) {
    return <p className="text-red-500">{initialRiwayatResult.error}</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Total Dokumen: {filteredRiwayat.length}</h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nomor atau judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="rounded-lg border shadow-sm mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nomor Dokumen</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead className="w-[150px]">Tipe</TableHead>
              <TableHead className="w-[200px]">Tanggal Dibuat</TableHead>
              <TableHead className="w-[200px] text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRiwayat.length > 0 ? (
              filteredRiwayat.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.nomor}</TableCell>
                  <TableCell>{item.judul}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground capitalize">
                      {item.tipe.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      disabled={isDeleting === item.id}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    
                    {/* --- TOMBOL DETAIL DIUBAH MENJADI TOMBOL HAPUS --- */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(item)}
                      disabled={isDeleting === item.id}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      {isDeleting === item.id ? "Menghapus..." : "Hapus"}
                    </Button>
                    {/* ------------------------------------------------ */}

                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  {searchTerm ? "Dokumen tidak ditemukan." : "Belum ada data riwayat."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- DIALOG UNTUK DETAIL SUDAH DIHAPUS DARI SINI --- */}
    </>
  );
}