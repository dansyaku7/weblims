"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// 2. Import ikon Edit (Pencil)
import { FileText, Search, Pencil } from "lucide-react";
import { RiwayatResult } from "@/lib/riwayat-service";

// Definisikan tipe data untuk item riwayat
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
  const router = useRouter(); // 3. Inisialisasi router
  const [riwayat, setRiwayat] = useState<RiwayatItem[]>(initialRiwayatResult.data || []);
  const [selectedItem, setSelectedItem] = useState<RiwayatItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRiwayat = useMemo(() => {
    if (!searchTerm) return riwayat;
    return riwayat.filter(
      (item) =>
        item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [riwayat, searchTerm]);

  const handleLihatDetail = (item: RiwayatItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  // 4. Buat fungsi untuk menangani klik edit
  const handleEdit = (item: RiwayatItem) => {
    // Arahkan ke halaman surat dengan membawa ID sebagai parameter URL
    router.push(`/surat?id=${item.id}`);
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
                    {/* 5. Tambahkan tombol Edit */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLihatDetail(item)}
                    >
                      <FileText className="mr-2 h-3 w-3" />
                      Detail
                    </Button>
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Data Dokumen</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Nomor: {selectedItem?.nomor}
            </p>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-md bg-muted p-4">
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(selectedItem?.dataForm, null, 2)}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
