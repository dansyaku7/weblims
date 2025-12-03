"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// --> UPDATE 1: Import Search Icon
import { Pencil, Trash2, Loader2, AlertCircle, Search } from "lucide-react"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
// --> UPDATE 2: Import Input (asumsi lo pake shadcn, kalau belum ada buat file ui/input atau pakai html biasa)
import { Input } from "@/components/ui/input"; 

const formatStatusText = (status: string) => {
  if (!status) return "Analisis";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

interface ReportListClientProps {
  initialReportsResult: any;
  userRole?: string;
}

export function ReportListClient({
  initialReportsResult,
  userRole,
}: ReportListClientProps) {
  const [reports, setReports] = useState(
    initialReportsResult.success ? initialReportsResult.data : []
  );
  // --> UPDATE 3: State untuk search query
  const [searchQuery, setSearchQuery] = useState("");
  
  const [error, setError] = useState(
    !initialReportsResult.success ? initialReportsResult.error : null
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const isAnalyst = userRole?.toLowerCase() === "analis";

  // --> UPDATE 4: Logic Filtering
  // Kita filter report berdasarkan query SEBELUM di-render
  const filteredReports = reports.filter((report: any) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const customerName = report.coverData?.customer?.toLowerCase() || "";
    const nomorFpps = report.coverData?.nomorFpps?.toLowerCase() || "";
    
    // Kalau analyst, mungkin cuma cari FPPS? Atau mau dua-duanya? 
    // Gua set default cari di DUA field ini biar UX enak.
    // Kecuali lo mau strict analyst gak boleh search nama customer (tapi aneh kalau gitu).
    if (customerName.includes(query)) return true;
    if (nomorFpps.includes(query)) return true;
    
    return false;
  });

  const handleEdit = (reportId: string) => {
    router.push(`/coa?id=${reportId}`);
  };

  const handleDelete = async (reportId: string) => {
    if (
      !confirm("Apakah Anda yakin ingin menghapus laporan ini secara permanen?")
    ) {
      return;
    }

    setLoadingId(reportId);
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus laporan dari server.");
      }

      setReports((prevReports: any[]) =>
        prevReports.filter((report) => report.id !== reportId)
      );
      toast.success("Laporan berhasil dihapus.");
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  const handleStatusChange = async (
    reportId: string,
    newStatus: "analisis" | "selesai"
  ) => {
    setLoadingId(reportId);
    try {
      const response = await fetch(`/api/reports/${reportId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Gagal mengubah status.");
      }

      setReports((prevReports: any[]) =>
        prevReports.map((report) =>
          report.id === reportId ? { ...report, status: newStatus } : report
        )
      );
      toast.success(
        `Status laporan berhasil diubah menjadi "${formatStatusText(
          newStatus
        )}"`
      );
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Gagal Memuat Data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <CardTitle>Laporan Tersimpan</CardTitle>
                <CardDescription>
                    {/* --> UPDATE 5: Tampilkan jumlah hasil filter, bukan total raw */}
                    Menampilkan {filteredReports.length} dari {reports.length} laporan.
                </CardDescription>
            </div>
            
            {/* --> UPDATE 6: Search Input UI */}
            <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Cari Customer atau No. FPPS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {!isAnalyst && <TableHead>Nama Customer</TableHead>}
                <TableHead>No. FPPS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* --> UPDATE 7: Render filteredReports instead of reports */}
              {filteredReports.length > 0 ? (
                filteredReports.map((report: any) => (
                  <TableRow key={report.id}>
                    {!isAnalyst && (
                      <TableCell className="font-medium">
                        {report.coverData?.customer || "-"}
                      </TableCell>
                    )}
                    <TableCell>{report.coverData?.nomorFpps || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === "selesai" ? "default" : "secondary"
                        }
                      >
                        {formatStatusText(report.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {loadingId === report.id ? (
                        <Loader2 className="h-4 w-4 animate-spin inline-block mr-2" />
                      ) : (
                        <>
                          {report.status !== "selesai" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusChange(report.id, "selesai")
                              }
                            >
                              Selesai
                            </Button>
                          )}
                          {report.status === "selesai" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(report.id, "analisis")
                              }
                            >
                              Analisis
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(report.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(report.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    key="empty-row"
                    colSpan={isAnalyst ? 3 : 4}
                    className="text-center h-24"
                  >
                   {/* --> UPDATE 8: Pesan kalau tidak ditemukan */}
                    {searchQuery 
                        ? "Tidak ada laporan yang cocok dengan pencarian." 
                        : "Belum ada laporan yang tersimpan."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}