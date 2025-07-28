"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface PengujianDocummentProps {
  nomorSurat: string;
  petugas: string[];
  sampelData: any[];
  signatureData: {
    pjTeknis: string;
    admin: string;
    signatureUrlPj: string | null;
    signatureUrlAdmin: string | null;
  };
}

export const PengujianDocumment = React.forwardRef<
  HTMLDivElement,
  PengujianDocummentProps
>(({ nomorSurat, petugas, sampelData, signatureData }, ref) => {
  const today = format(new Date(), "dd MMMM yyyy", { locale: id });

  return (
    <div
      ref={ref}
      className="bg-white px-8 py-2 font-[Times_New_Roman] text-black relative"
      style={{
        width: "210mm",
        minHeight: "297mm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[500px] h-[500px] opacity-10">
          <Image
            src="/images/logo-delta-transparan.png"
            alt="Logo DIL Watermark"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <div>
          <div className="flex justify-between items-end pb-2">
            <img
              src="/images/logo-delta-big.png"
              alt="Logo Delta Indonesia Laboratory"
              className="h-30 w-auto"
            />
            <div className="text-right text-[10px]">
              <p className="font-bold text-xl">
                PT. Delta Indonesia Laboratory
              </p>
              <p>Jl. Perum Prima Harapan Regency</p>
              <p>Gedung Prima Orchard Block C, No. 2</p>
              <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
              <p>Telp: 021 – 88382018</p>
            </div>
          </div>
          <hr className="border-t-2 border-black" />
        </div>

        <main className="mt-4 text-sm flex-grow">
          <h1 className="text-center text-lg font-bold underline">
            SURAT TUGAS PENGUJIAN SAMPEL
          </h1>
          <p className="text-center text-sm">
            No: {nomorSurat || "0.29/DIL/VII/2025/STP"}
          </p>

          <div className="mt-6">
            <p>Memerintahkan kepada:</p>
            <div className="pl-4 mt-2">
              {petugas.map((nama, index) => (
                <div key={index} className="flex">
                  <span className="w-6">{index + 1}.</span>
                  <span>{nama}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="font-bold text-center bg-gray-200">
                  <th className="border border-black p-1 w-[5%]">No.</th>
                  <th className="border border-black p-1 w-[15%]">Sampel ID</th>
                  <th className="border border-black p-1 w-[35%]">
                    Parameter Uji
                  </th>
                  <th className="border border-black p-1 w-[10%]">
                    Tipe Sampel
                  </th>
                  <th className="border border-black p-1 w-[15%]">
                    Deadline Pengujian
                  </th>
                  <th className="border border-black p-1 w-[20%]">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {sampelData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-black p-1 text-center align-top">
                      {index + 1}
                    </td>
                    <td className="border border-black p-1 align-top">
                      {row.id}
                    </td>
                    <td className="border border-black p-1 align-top">
                      {row.parameter}
                    </td>
                    <td className="border border-black p-1 align-top text-center">
                      {row.tipeSampel}
                    </td>
                    <td className="border border-black p-1 align-top text-center">
                      {row.deadline
                        ? format(new Date(row.deadline), "dd/MM/yyyy")
                        : ""}
                    </td>
                    <td className="border border-black p-1 align-top">
                      {row.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <footer className="flex justify-between text-center text-sm pt-8">
          <div className="w-1/3">
            <p>&nbsp;</p>
            <p>Admin,</p>
            <div className="relative h-20 w-full">
              {signatureData.signatureUrlAdmin && (
                <img
                  src={signatureData.signatureUrlAdmin}
                  alt="TTD Admin"
                  className="absolute inset-0 mx-auto h-full w-full object-contain"
                />
              )}
            </div>
            <p className="font-bold underline">
              {signatureData.admin || "....................."}
            </p>
            <p>&nbsp;</p>
          </div>

          <div className="w-1/3">
            <p>Bekasi, {today}</p>
            <p>PT Delta Indonesia Laboratory</p>
            <div className="relative h-20 w-full">
              {signatureData.signatureUrlPj && (
                <img
                  src={signatureData.signatureUrlPj}
                  alt="TTD PJ Teknis"
                  className="absolute inset-0 mx-auto h-full w-full object-contain"
                />
              )}
            </div>
            <p className="font-bold underline">
              {signatureData.pjTeknis || "....................."}
            </p>
            <p>PJ Teknis</p>
          </div>
        </footer>
      </div>
    </div>
  );
});

PengujianDocumment.displayName = "PengujianDocumment";
