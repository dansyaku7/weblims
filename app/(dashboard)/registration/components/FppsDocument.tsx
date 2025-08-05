import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface RincianUji {
  id: string;
  area: string;
  matriks: string;
  parameter: string;
  regulasi: string;
  metode: string;
}

interface FppsDocumentProps {
  data: {
    nomorFpps: string;
    nomorQuotation: string;
    petugas: string[];
    namaPelanggan: string;
    alamatPelanggan: string;
    noTelp: string;
    tanggalMasuk: string;
    kegiatan: string;
    rincian: RincianUji[];
  };
}

export const FppsDocument = React.forwardRef<HTMLDivElement, FppsDocumentProps>(
  ({ data }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return ".........................";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return new Intl.DateTimeFormat('id-ID', {
          day: '2-digit', month: 'long', year: 'numeric',
        }).format(date);
      } catch (e) {
        return dateString;
      }
    };

    return (
      <div
        ref={ref}
        className="bg-white p-8 text-black text-xs font-[Times_New_Roman]"
      >
        {/* === BAGIAN HEADER === */}
        <div className="flex justify-between items-start">
          <img
            src="/images/logo-delta-big.png"
            alt="Logo Delta Indonesia Laboratory"
            className="h-20 w-auto"
          />
          <div className="text-right text-[10px]">
            <p className="font-bold text-lg">PT. Delta Indonesia Laboratory</p>
            <p>Jl. Perum Prima Harapan Regency</p>
            <p>Gedung Prima Orchard Block C, No. 2</p>
            <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
            <p>Telp: 021 – 88382018</p>
          </div>
        </div>
        <hr className="border-t-2 border-black my-2" />
        <div className="text-center mb-4">
          <h1 className="text-sm font-bold underline uppercase">
            PERMINTAAN PENGUJIAN
          </h1>
          <h1 className="text-sm font-bold underline">
            Penerimaan Contoh Uji dan Atau Kaji Ulang Permintaan Pengujian
          </h1>
        </div>

        {/* === BAGIAN INFO DASAR === */}
        <div>
          <div className="font-bold">I. PERMINTAAN PENGUJIAN</div>
          <div className="border border-black">
            <div className="p-1 font-bold border-b border-black">
              KODE CONTOH UJI
            </div>
            <div className="flex">
              <div className="w-[65%]">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-1 w-8 font-bold">1)</td>
                      <td className="p-1 w-48 font-bold">Nama Pelanggan</td>
                      <td className="p-1 w-4">:</td>
                      <td className="p-1">{data.namaPelanggan}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 align-top font-bold">2)</td>
                      <td className="p-1 align-top font-bold">Alamat Pelanggan</td>
                      <td className="p-1 align-top">:</td>
                      <td className="p-1">{data.alamatPelanggan}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1"></td>
                      <td className="p-1 font-bold">No. Telp/HP.</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.noTelp}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 font-bold">3)</td>
                      <td className="p-1 font-bold">Tanggal Masuk Contoh Uji</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{formatDate(data.tanggalMasuk)}</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">4)</td>
                      <td className="p-1 font-bold">Kegiatan/Paket Pekerjaan</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.kegiatan}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-[35%] border-l border-black">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-1 w-32 font-bold">Nomor FPPS</td>
                      <td className="p-1 w-4">:</td>
                      <td className="p-1 font-bold">{data.nomorFpps}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 font-bold">Nomor Quotation</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.nomorQuotation}</td>
                    </tr>
                    <tr>
                      <td className="p-1 align-top font-bold">Petugas</td>
                      <td className="p-1 align-top">:</td>
                      <td className="p-1">
                        <div className="grid grid-cols-2">
                          <div>
                            {data.petugas.slice(0, 3).map((nama, i) => (
                              <div key={i}>{`${i + 1}. ${nama}`}</div>
                            ))}
                          </div>
                          <div>
                            {data.petugas.slice(3).map((nama, i) => (
                              <div key={i}>{`${i + 4}. ${nama}`}</div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* === BAGIAN RINCIAN UJI === */}
        <div className="mt-2">
          <table className="w-full border-collapse border border-black text-xs">
            <thead className="font-bold text-center">
              <tr>
                <th className="border-r border-b border-black p-1 text-left" colSpan={7}>
                  5) Rincian Pengujian
                </th>
              </tr>
              <tr>
                <th className="border-r border-b border-black p-1 w-[4%]">No.</th>
                <th className="border-r border-b border-black p-1 w-[12%]">Sample ID</th>
                <th className="border-r border-b border-black p-1 w-[15%]">Area</th>
                <th className="border-r border-b border-black p-1 w-[6%]">Matriks</th>
                <th className="border-r border-b border-black p-1 w-[35%]">Parameter</th>
                <th className="border-r border-b border-black p-1 w-[18%]">Regulasi</th>
                <th className="border-b border-black p-1 w-[10%]">Metode</th>
              </tr>
            </thead>
            <tbody>
              {data.rincian.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-r border-b border-black p-1 text-center align-top">{index + 1}</td>
                  <td className="border-r border-b border-black p-1 align-top">{item.id}</td>
                  <td className="border-r border-b border-black p-1 align-top">{item.area}</td>
                  <td className="border-r border-b border-black p-1 text-center align-top">{item.matriks}</td>
                  <td className="border-r border-b border-black p-1 align-top whitespace-pre-wrap">{item.parameter}</td>
                  <td className="border-r border-b border-black p-1 align-top whitespace-pre-wrap">{item.regulasi}</td>
                  <td className="border-b border-black p-1 text-center align-top">{item.metode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    
        <div className="mt-4">
          {/* Judul ini sekarang di luar, berlaku untuk kedua kolom di bawahnya */}
          <p className="text-left text-[10px] mb-1">
            DIISI OLEH PETUGAS ADMINISTRASI LABORATORIUM
          </p>

          <div className="flex items-start gap-4">
            {/* Kolom Kiri */}
            <div className="w-1/2">
              <p className="text-left font-bold">II. PENERIMAAN SAMPEL / CONTOH UJI</p>
              <table className="w-full border-collapse border border-black">
                <thead className="font-bold text-center">
                  <tr>
                    <td className="border border-black p-1 w-[8%]">No.</td>
                    <td className="border border-black p-1 w-[42%]">Uraian</td>
                    <td className="border border-black p-1 w-[25%]">Kondisi Contoh</td>
                    <td className="border border-black p-1 w-[25%]">Keterangan</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-1 text-center">1)</td>
                    <td className="border border-black p-1">Jumlah</td>
                    <td className="border border-black p-1 text-center">Cukup / Tidak</td>
                    <td className="border border-black p-1 h-6"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-center">2)</td>
                    <td className="border border-black p-1">Kondisi</td>
                    <td className="border border-black p-1 text-center">Baik / Tidak</td>
                    <td className="border border-black p-1 h-6"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-center">3)</td>
                    <td className="border border-black p-1">Tempat contoh uji / wadah</td>
                    <td className="border border-black p-1 text-center">Baik / Tidak</td>
                    <td className="border border-black p-1 h-6"></td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 ml-7 underline">
                Waktu pelaksanaan pengujian maksimum ......................... hari kerja *)
              </p>
            </div>

            {/* Kolom Kanan */}
            <div className="w-1/2">
              <p className="font-bold text-left">III. KAJI ULANG PERMINTAAN PENGUJIAN</p>
              <table className="w-full border-collapse border border-black">
                <tbody>
                  <tr>
                    <td className="border border-black p-1 w-[5%] text-center">1)</td>
                    <td className="border border-black p-1 w-[55%]">Kemampuan SDM</td>
                    <td className="border border-black p-1 w-[5%] text-center">:</td>
                    <td className="border border-black p-1 w-[35%] text-left">YA / TIDAK</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-center">2)</td>
                    <td className="border border-black p-1">Kesesuaian Metode</td>
                    <td className="border border-black p-1 text-center">:</td>
                    <td className="border border-black p-1 text-left">YA / TIDAK</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-center">3)</td>
                    <td className="border border-black p-1">Kemampuan Peralatan</td>
                    <td className="border border-black p-1 text-center">:</td>
                    <td className="border border-black p-1 text-left">YA / TIDAK</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-center">4)</td>
                    <td className="border border-black p-1">Kesimpulan</td>
                    <td className="border border-black p-1 text-center">:</td>
                    <td className="border border-black p-1 text-left">BISA / TIDAK BISA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ======================================= */}

        <div className="mt-2 w-full">
          <div className="border border-black h-12 w-full">
            <p className="ml-1">Catatan :</p>
          </div>
        </div>

        {/* Bagian Tanda Tangan */}
        <div className="flex justify-around items-end mt-4">
            <div className="text-center">
              <p>PJ Teknis</p>
              <div className="h-16"></div>
              <p>(..........................................)</p>
            </div>
            <div className="text-center">
                <p>Bekasi, {formatDate(new Date().toISOString())}</p>
              <p>Pelanggan</p>
              <div className="h-16"></div>
              <p>(..........................................)</p>
            </div>
        </div>

        <div className="text-[10px] mt-4 space-y-1">
            <p><strong>Catatan Tambahan :</strong></p>
            <p>- Apabila terdapat perubahan yang mengakibatkan pengujian tidak dapat dilakukan atau disubkontrakkan, maka akan ada pemberitahuan dari Laboratorium DIL Kota Bekasi paling lambat 3 (tiga) hari kerja sejak Permintaan Pengujian diterima.</p>
            <p>- *) Penerbitan Certificate Of Analysis (COA) maksimal 14 (empat belas) hari kerja setelah sampel diterima.</p>
            <p className="text-[9px] mt-1">FR-7.1.1</p>
        </div>
      </div>
    );
  }
);

FppsDocument.displayName = "FppsDocument";