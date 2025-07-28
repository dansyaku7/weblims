// File: app/(dashboard)/library/components/ReportListClient.tsx

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
import { Pencil, Trash2, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const formatStatusText = (status: string) => {
  if (!status) return "Analisis";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// --> PERUBAHAN 1: Update tipe props untuk menerima userRole
interface ReportListClientProps {
  initialReportsResult: any;
  userRole?: string;
}

export function ReportListClient({
  initialReportsResult,
  userRole, // <-- Terima prop userRole di sini
}: ReportListClientProps) {
  const [reports, setReports] = useState(
    initialReportsResult.success ? initialReportsResult.data : []
  );
  const [error, setError] = useState(
    !initialReportsResult.success ? initialReportsResult.error : null
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  // --> PERUBAHAN 2: Buat variabel untuk mengecek role
  const isAnalyst = userRole?.toLowerCase() === "analis";

  // ... (semua fungsi handleEdit, handleDelete, handleStatusChange tetap sama) ...
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
        <CardTitle>Laporan Tersimpan</CardTitle>
        <CardDescription>
          Total {reports.length} laporan ditemukan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* --> PERUBAHAN 3: Render kolom ini secara kondisional */}
                {!isAnalyst && <TableHead>Nama Customer</TableHead>}
                <TableHead>No. FPPS</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length > 0 ? (
                reports.map((report: any) => (
                  <TableRow key={report.id}>
                    {/* --> PERUBAHAN 4: Render sel ini secara kondisional */}
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
                    // --> PERUBAHAN 5: Buat colSpan dinamis
                    colSpan={isAnalyst ? 3 : 4}
                    className="text-center h-24"
                  >
                    Belum ada laporan yang tersimpan.
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