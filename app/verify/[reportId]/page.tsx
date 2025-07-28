"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, ShieldCheck, ShieldX } from "lucide-react";
import Image from "next/image";

interface VerificationData {
  certificateNo: string;
  customer: string;
  reportDate: string;
  nomorFpps: string;
}

export default function VerificationPage() {
  const params = useParams();
  const reportId = params.reportId as string;
  const [data, setData] = useState<VerificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reportId) {
      fetch(`/api/verify/${reportId}`)
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.error || "Laporan tidak ditemukan.");
            });
          }
          return res.json();
        })
        .then((result) => {
          if (result.success) {
            setData(result.data);
          } else {
            throw new Error(result.error || "Gagal memverifikasi data.");
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [reportId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center text-white text-center">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p>Memverifikasi data...</p>
        </div>
      );
    }

    return (
      <Card className="w-full max-w-md bg-slate-950 border-slate-800 text-white shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="w-32 h-auto">
            <Image
              src="/images/logo-delta.png"
              alt="Logo DIL"
              width={120}
              height={50}
            />
          </div>
          {error ? (
            <>
              <ShieldX className="w-16 h-16 text-red-500 mt-4" />
              <CardTitle className="text-2xl text-red-400 mt-2">
                Verifikasi Gagal
              </CardTitle>
            </>
          ) : (
            <>
              <ShieldCheck className="w-16 h-16 text-green-500 mt-4" />
              <CardTitle className="text-2xl text-green-400 mt-2">
                Dokumen Terverifikasi
              </CardTitle>
              <CardDescription>
                Sertifikat ini terdaftar secara resmi di sistem kami.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="text-sm">
          {error ? (
            <p className="text-center text-slate-400 p-4 bg-slate-900 rounded-md">
              {error}
            </p>
          ) : (
            <div className="space-y-3 p-4 bg-slate-900 rounded-md">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 flex-shrink-0">
                  No. Sertifikat:
                </span>
                <span className="font-mono text-right break-all">
                  {data?.certificateNo || "-"}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 flex-shrink-0">No. FPPS:</span>
                <span className="font-mono text-right break-all">
                  {data?.nomorFpps || "-"}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 flex-shrink-0">
                  Nama Pelanggan:
                </span>
                <span className="font-medium text-right">
                  {data?.customer || "-"}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 flex-shrink-0">
                  Tanggal Laporan:
                </span>
                <span className="text-right">{data?.reportDate || "-"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center p-4">
      {renderContent()}
    </main>
  );
}
