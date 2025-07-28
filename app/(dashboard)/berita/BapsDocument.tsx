"use client";

import React from "react";
import Image from "next/image";

interface BapsDocumentProps {
  data: {
    nomorFpps: string;
    perusahaan: string;
    alamat: string;
    noTelp: string;
    hariTanggal: string;
    titikPengujian: {
      udaraAmbien: string;
      emisiCerobong: string;
      pencahayaan: string;
      heatStress: string;
      udaraRuangKerja: string;
      kebauan: string;
      kebisingan: string;
      airLimbah: string;
    };
    rincianUji: Array<{
      id: string;
      lokasi: string;
      parameter: string;
      regulasi: string;
      jenisSampel: string;
      waktuPengambilan: string;
    }>;
    penandaTangan: {
      pihakLab: string;
      signatureUrlLab: string | null;
      pihakPerusahaan: string;
      signatureUrlPerusahaan: string | null;
    };
  };
}

export const BapsDocument = React.forwardRef<HTMLDivElement, BapsDocumentProps>(
  ({ data }, ref) => {
    const generateNomorSurat = () => {
      const bulanRomawi = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];
      const bulan = new Date().getMonth();
      const tahun = new Date().getFullYear();
      const suffix = data.nomorFpps
        ? data.nomorFpps.slice(-3).padStart(3, "0")
        : "___";
      return `${suffix}/DIL/${bulanRomawi[bulan]}/${tahun}/BA`;
    };

    return (
      <div
        ref={ref}
        className="bg-white px-8 py-2 font-[Times_New_Roman] text-xs text-black relative"
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
                <p>Telp: 021 – 88982018</p>
              </div>
            </div>
            <hr className="border-t-2 border-black" />
          </div>

          <div className="text-center my-4">
            <h1 className="text-sm font-bold underline">
              Berita Acara Pengambilan Sampel
            </h1>
            <p>Nomor: {generateNomorSurat()}</p>
          </div>

          <main className="flex-grow">
            <p className="mb-2">
              Telah dilakukan pengambilan sampel oleh pihak PT Delta Indonesia
              Laboratory pada:
            </p>
            <table className="w-full mb-2 text-xs">
              <tbody>
                <tr>
                  <td className="w-1/5">Perusahaan</td>
                  <td>: {data.perusahaan}</td>
                </tr>
                <tr>
                  <td className="w-1/5">Alamat</td>
                  <td>: {data.alamat}</td>
                </tr>
                <tr>
                  <td className="w-1/5">Telp./Fax</td>
                  <td>: {data.noTelp}</td>
                </tr>
                <tr>
                  <td className="w-1/5">Pada hari, tgl</td>
                  <td>: {data.hariTanggal}</td>
                </tr>
              </tbody>
            </table>
            <p>Dengan lokasi masing-masing:</p>
            <div className="grid grid-cols-2 gap-x-8 text-xs my-2">
              <div>
                <p>
                  Udara Ambien: {data.titikPengujian.udaraAmbien || "..."} titik
                </p>
                <p>
                  Emisi Cerobong: {data.titikPengujian.emisiCerobong || "..."}{" "}
                  titik
                </p>
                <p>
                  Pencahayaan: {data.titikPengujian.pencahayaan || "..."} titik
                </p>
                <p>
                  Heat Stress: {data.titikPengujian.heatStress || "..."} titik
                </p>
              </div>
              <div>
                <p>
                  Udara Ruang Kerja:{" "}
                  {data.titikPengujian.udaraRuangKerja || "..."} titik
                </p>
                <p>Kebauan: {data.titikPengujian.kebauan || "..."} titik</p>
                <p>
                  Kebisingan: {data.titikPengujian.kebisingan || "..."} titik
                </p>
                <p>
                  Air Limbah: {data.titikPengujian.airLimbah || "..."} titik
                </p>
              </div>
            </div>

            <table className="w-full border-collapse border border-black text-xs mt-2">
              <thead className="font-bold bg-gray-200 text-center">
                <tr>
                  <th className="border border-black p-1 w-[5%]">No</th>
                  <th className="border border-black p-1 w-[15%]">Lokasi</th>
                  <th className="border border-black p-1 w-[25%]">Parameter</th>
                  <th className="border border-black p-1 w-[25%]">Regulasi</th>
                  <th className="border border-black p-1 w-[15%]">
                    Jenis Sampel
                  </th>
                  <th className="border border-black p-1 w-[15%]">
                    Waktu Pengambilan (Jam)
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rincianUji.map((item, index) => (
                  <tr key={item.id} className="break-inside-avoid">
                    <td className="border border-black p-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-1">{item.lokasi}</td>
                    <td
                      className="border border-black p-1"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {item.parameter}
                    </td>
                    <td
                      className="border border-black p-1"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {item.regulasi}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {item.jenisSampel}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {item.waktuPengambilan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>

          <footer className="flex justify-between text-center text-xs pt-8">
            <div className="w-1/3">
              <p>Pihak Laboratorium,</p>
              <p>PT. Delta Indonesia Laboratory</p>
              <div className="relative h-20 w-full">
                {data.penandaTangan.signatureUrlLab && (
                  <Image
                    src={data.penandaTangan.signatureUrlLab}
                    alt="TTD Pihak Lab"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <p className="font-bold underline">
                {data.penandaTangan.pihakLab || "(.........................)"}
              </p>
              <p>Petugas Pengambil Sampel</p>
            </div>

            <div className="w-1/3">
              <p>Pihak Perusahaan,</p>
              <p className="truncate">{data.perusahaan}</p>
              <div className="relative h-20 w-full">
                {data.penandaTangan.signatureUrlPerusahaan && (
                  <Image
                    src={data.penandaTangan.signatureUrlPerusahaan}
                    alt="TTD Pihak Perusahaan"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <p className="font-bold underline">
                {data.penandaTangan.pihakPerusahaan ||
                  "(.........................)"}
              </p>
              <p>Perwakilan Perusahaan</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
);

BapsDocument.displayName = "BapsDocument";
