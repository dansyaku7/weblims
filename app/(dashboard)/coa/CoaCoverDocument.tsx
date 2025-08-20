"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { QRCodeCanvas } from "qrcode.react";

interface CoaCoverDocumentProps {
  data: {
    customer: string;
    address: string;
    phone: string;
    contactName: string;
    email: string;
    subjects: string[];
    sampleTakenBy: string[];
    receiveDate: Date | undefined;
    analysisDateStart: Date | undefined;
    analysisDateEnd: string | Date | undefined;
    reportDate: Date | undefined; // Tipe sudah benar
    signatureUrl: string | null;
    directorName: string;
    showKanLogo: boolean;
    nomorFpps: string;
    certificateNo: string;
    totalPages: number;
    reportId?: string;
  };
}

const sampleTakenByOptions = [
  "PT. Delta Indonesia Laboratory",
  "Customer",
  "Third Party",
];

// FUNGSI BANTUAN UNTUK FORMAT TANGGAL YANG AMAN
const formatDateSafe = (date: Date | string | undefined) => {
  if (!date) return "";
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "";
    return format(dateObj, "MMMM dd, yyyy", { locale: id });
  } catch {
    return "";
  }
};

// FUNGSI BANTUAN UNTUK FORMAT RENTANG TANGGAL
const formatDateRange = (startDate: Date | string | undefined, endDate: Date | string | undefined) => {
  const formattedStart = formatDateSafe(startDate);
  const formattedEnd = formatDateSafe(endDate);
  if (formattedStart && formattedEnd) {
    if (formattedStart === formattedEnd) {
        return formattedStart;
    }
    return `${formattedStart} to ${formattedEnd}`;
  }
  if (formattedStart) {
    return formattedStart;
  }
  return "Tanggal tidak tersedia";
};

export const CoaCoverDocument = React.forwardRef<
  HTMLDivElement,
  CoaCoverDocumentProps
>(({ data }, ref) => {
  const getVerificationUrl = () => {
    if (typeof window !== "undefined" && data.reportId) {
      return `${window.location.origin}/verify/${data.reportId}`;
    }
    return "";
  };
  const verificationUrl = getVerificationUrl();

  const getSampleTakenByText = () => {
    return sampleTakenByOptions.map((opt) => (
      <p key={opt} className="font-mono text-xs">
        <span className="mr-2">
          {data.sampleTakenBy.includes(opt) ? "●" : "○"}
        </span>
        {opt}
      </p>
    ));
  };

  return (
    <div
      ref={ref}
      className="p-10 font-serif text-black bg-white relative flex flex-col [print-color-adjust:exact]"
      style={{ width: "210mm", height: "297mm" }}
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[500px] h-[500px]" style={{ opacity: 0.15 }}>
          <img
            src="/images/logo-delta-transparan.png"
            alt="Logo DIL Watermark"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <header>
          <div className="flex justify-between items-center">
            <div className="w-auto">
              <img
                src="/images/logo-delta-big.png"
                alt="Logo Delta Indonesia Laboratory"
                className="h-30 w-auto"
              />
            </div>
            {data.showKanLogo && (
              <div className="flex flex-col items-end text-right">
                <div className="w-24 mb-1">
                  <Image
                    src="/images/kan-logo.png"
                    alt="Logo KAN"
                    width={100}
                    height={45}
                  />
                </div>
                <div className="text-[7px] leading-tight font-sans mt-1 space-y-px">
                  <p>SK-KLHK No.00161/LPJ/Labling-1/LRK/KLHK</p>
                  <p>7-a.DEC.2023-6.DEC.2028</p>
                  <p>Halaman 1 dari {data.totalPages}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow">
          <div className="text-center my-12">
            <h1 className="text-base font-bold tracking-wider">
              CERTIFICATE OF ANALYSIS (COA)
            </h1>
            <p className="text-xs">
              Certificate No.{" "}
              {data.certificateNo || "........................."}
            </p>
          </div>

          <div className="px-8 text-xs">
            <div className="grid grid-cols-[140px_10px_1fr] gap-x-1 gap-y-1.5 mb-5">
              <p className="font-bold">Customer</p>
              <p>:</p>
              <p>{data.customer}</p>
              <p className="font-bold">Address</p>
              <p>:</p>
              <p>{data.address}</p>
              <p className="font-bold">Contact Name</p>
              <p>:</p>
              <p>{data.contactName}</p>
              <p className="font-bold">Email</p>
              <p>:</p>
              <p>{data.email}</p>
              <p className="font-bold">Phone</p>
              <p>:</p>
              <p>{data.phone}</p>
            </div>

            <div className="grid grid-cols-[140px_10px_1fr] gap-x-1 gap-y-1.5 mb-5">
              <p className="font-bold self-start">Subject</p>
              <p className="self-start">:</p>
              <div>
                {data.subjects.length > 0 ? (
                  data.subjects.map((s) => <p key={s}>- {s}</p>)
                ) : (
                  <p>-</p>
                )}
              </div>
              <p className="font-bold self-start pt-2">Sample taken by</p>
              <p className="self-start pt-2">:</p>
              <div className="pt-2">{getSampleTakenByText()}</div>
            </div>

            <div className="grid grid-cols-[140px_10px_1fr] gap-x-1 gap-y-1.5">
              <p className="font-bold">Sample Receive Date</p>
              <p>:</p>
              <p>{formatDateSafe(data.receiveDate)}</p>

              <p className="font-bold">Sample Analysis Date</p>
              <p>:</p>
              <p>
                {formatDateRange(data.analysisDateStart, data.analysisDateEnd)}
              </p>
              
              <p className="font-bold">Report Date</p>
              <p>:</p>
              {/* ===== INI BAGIAN YANG DIPERBAIKI ===== */}
              <p>{formatDateSafe(data.reportDate)}</p>
              {/* ======================================= */}
            </div>
          </div>
        </main>

        <footer className="mt-auto pt-8">
          <div className="flex justify-between items-end">
           <div className="w-1/2">
      {/* Kita buat flex container baru di sini */}
      <div className="flex items-end space-x-4">
        {/* Kolom untuk QR Code */}
        {verificationUrl && (
          <div>
            <QRCodeCanvas
              value={verificationUrl} 
              size={512} // <-- Naikkan resolusi render (misal, 512px)
              level="H" 
              style={{ width: 'auto', height: '120' }}
            />
          </div>
        )}

        {/* Kolom untuk Teks Alamat */}
        <div className="text-[8px] space-y-px">
          <p className="font-bold">Ruko Prima Orchard No.C3</p>
          <p>Jl. Raya Perjuangan, Harapan Baru,</p>
          <p>Kec. Bekasi Utara, Kota Bekasi, Jawa Barat</p>
          <p>Telp : 021-8923 7914</p>
          <p className="text-blue-600">www.deltaindonesialab.com</p>
        </div>
      </div>
    </div>

            <div className="text-center text-xs w-5/12 ml-auto">
              <p>
                This Certificate of Analysis consist of {data.totalPages} pages
              </p>
              {/* Menggunakan formatDateSafe juga di sini untuk konsistensi */}
              <p className="mt-1">Bekasi, {formatDateSafe(data.reportDate)}</p>
              <div className="relative h-20 w-32 my-1 mx-auto">
                {data.signatureUrl ? (
                  <img
                    src={data.signatureUrl}
                    alt="Signature"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div className="h-full w-full"></div>
                )}
              </div>
              <p className="font-bold underline">{data.directorName}</p>
              <p>Direktur Utama</p>
            </div>
          </div>
          <div className="text-center text-[7px] italic mt-4 pt-2 border-t border-gray-400">
            "This result (s) relate only to the sample (s) tested and the test
            report/certificate shall not be reproduced except in full, without
            written approval of PT Delta Indonesia Laboratory"
          </div>
        </footer>
      </div>
    </div>
  );
});

CoaCoverDocument.displayName = "CoaCoverDocument";