"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";

// Definisikan tipe data untuk item riwayat
interface RiwayatItem {
  id: string;
  tipe: string;
  nomor: string;
  judul: string;
  createdAt: string;
  dataForm: any; // dataForm bisa berisi struktur apa pun
}

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState<RiwayatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<RiwayatItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fungsi untuk mengambil data dari API
  const fetchRiwayat = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/riwayat");
      setRiwayat(response.data);
    } catch (error) {
      console.error("Gagal mengambil data riwayat:", error);
      toast.error("Gagal memuat data riwayat. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchRiwayat saat komponen pertama kali dimuat
  useEffect(() => {
    fetchRiwayat();
  }, []);

  // Fungsi untuk menangani klik tombol "Lihat Detail"
  const handleLihatDetail = (item: RiwayatItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  // Fungsi untuk memformat tanggal agar lebih mudah dibaca
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8 px-4 pt-6 md:px-8 lg:px-6">
      <div>
        <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
          Riwayat Dokumen
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Lihat semua dokumen yang pernah dibuat dan disimpan dalam sistem.
        </p>
      </div>

      <div className="rounded-lg border shadow-sm">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Memuat data...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Nomor Dokumen</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead className="w-[150px]">Tipe</TableHead>
                <TableHead className="w-[200px]">Tanggal Dibuat</TableHead>
                <TableHead className="w-[120px] text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riwayat.length > 0 ? (
                riwayat.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nomor}</TableCell>
                    <TableCell>{item.judul}</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                        {item.tipe.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLihatDetail(item)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Belum ada data riwayat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Dialog untuk menampilkan detail data form */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Data Dokumen</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Nomor: {selectedItem?.nomor}
            </p>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-md bg-muted p-4">
            <pre className="text-sm">
              {JSON.stringify(selectedItem?.dataForm, null, 2)}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
