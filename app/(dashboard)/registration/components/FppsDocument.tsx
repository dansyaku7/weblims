import React from "react";

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
    const alamatArray = data.alamatPelanggan.split("Cikarang Barat");
    const alamatL1 = alamatArray[0] ? `${alamatArray[0]}Cikarang Barat` : "";
    const alamatL2 = alamatArray[1]
      ? alamatArray[1].replace(",", "").trim()
      : "";

    return (
      <div
        ref={ref}
        className="bg-white p-8 text-black text-xs font-[Times_New_Roman]"
      >
        <div className="flex justify-between items-start">
          <img
            src="/images/logo-delta-big.png"
            alt="Logo Delta Indonesia Laboratory"
            className="h-30 w-auto"
          />
          <div className="text-right text-[10px]">
            <p className="font-bold text-xl">PT. Delta Indonesia Laboratory</p>
            <p>Jl. Perum Prima Harapan Regency</p>
            <p>Gedung Prima Orchard Block C, No. 2</p>
            <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
            <p>Telp: 021 – 88382018</p>
          </div>
        </div>
        <hr className="border-t-2 border-black" />
        <div className="text-center mb-4">
          <h1 className="text-sm font-bold underline uppercase">
            PERMINTAAN PENGUJIAN
          </h1>
          <h1 className="text-sm font-bold underline">
            Penerimaan Contoh Uji dan Atau Kaji Ulang Permintaan Pengujian
          </h1>
        </div>

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
                      <td className="p-1 align-top font-bold">
                        Alamat Pelanggan
                      </td>
                      <td className="p-1 align-top">:</td>
                      <td className="p-1">
                        <div>{alamatL1}</div>
                        <div>{alamatL2}</div>
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1"></td>
                      <td className="p-1 font-bold">No. Telp/HP.</td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.noTelp}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-1 font-bold">3)</td>
                      <td className="p-1 font-bold">
                        Tanggal Masuk Contoh Uji
                      </td>
                      <td className="p-1">:</td>
                      <td className="p-1">{data.tanggalMasuk}</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-bold">4)</td>
                      <td className="p-1 font-bold">
                        Kegiatan/Paket Pekerjaan
                      </td>
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
                              <div key={i}>{`${i + 1} ${nama}`}</div>
                            ))}
                          </div>
                          <div>
                            {data.petugas.slice(3).map((nama, i) => (
                              <div key={i}>{`${i + 4} ${nama}`}</div>
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

        <div className="mt-2">
          <table className="w-full border-collapse border border-black text-xs">
            {/* ...thead dan tbody rincian... */}
            <thead className="font-bold">
              <tr>
                <th
                  className="border-r border-b border-black p-1 text-left"
                  colSpan={7}
                >
                  5) Rincian Pengujian
                </th>
              </tr>
              <tr>
                <th className="border-r border-b border-black p-1 w-[4%]">
                  No.
                </th>
                <th className="border-r border-b border-black p-1 w-[12%]">
                  Sample ID
                </th>
                <th className="border-r border-b border-black p-1 w-[15%]">
                  Area
                </th>
                <th className="border-r border-b border-black p-1 w-[8%]">
                  Matriks
                </th>
                <th className="border-r border-b border-black p-1 w-[31%]">
                  Parameter
                </th>
                <th className="border-r border-b border-black p-1 w-[15%]">
                  Regulasi
                </th>
                <th className="border-b border-black p-1 w-[15%]">Metode</th>
              </tr>
            </thead>
            <tbody>
              {data.rincian.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-r border-b border-black p-1 text-center align-top">
                    {index + 1}
                  </td>
                  <td className="border-r border-b border-black p-1 align-top">
                    {item.id}
                  </td>
                  <td className="border-r border-b border-black p-1 align-top">
                    {item.area}
                  </td>
                  <td className="border-r border-b border-black p-1 text-center align-top">
                    {item.matriks}
                  </td>
                  <td className="border-r border-b border-black p-1 align-top whitespace-pre-wrap">
                    {item.parameter}
                  </td>
                  <td className="border-r border-b border-black p-1 align-top whitespace-pre-wrap">
                    {item.regulasi}
                  </td>
                  <td className="border-b border-black p-1 text-center align-top">
                    {item.metode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[9px] mt-1">FR-7.1.1</p>
        <div className="mt-4">
          <div className="flex justify-between items-start gap-6">
            {/* Kolom Kiri */}
            <div className="w-1/2">
              <p className="text-left text-[10px]">
                DIISI OLEH PETUGAS ADMINISTRASI LABORATORIUM
              </p>
              <p className="text-left text-[10px] font-bold">
                II. PENERIMAAN SAMPEL / CONTOH UJI
              </p>
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr className="font-bold">
                    <td className="border border-black p-1 w-[4%]">No.</td>
                    <td className="border border-black p-1">Uraian</td>
                    <td className="border border-black p-1 text-center">
                      Kondisi Contoh
                    </td>
                    <td className="border border-black p-1 text-center">
                      Keterangan
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-1">1)</td>
                    <td className="border border-black p-1">Jumlah</td>
                    <td className="border border-black p-1 text-center">
                      Cukup / Tidak
                    </td>
                    <td className="border border-black p-1 h-6"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1">2)</td>
                    <td className="border border-black p-1">Kondisi</td>
                    <td className="border border-black p-1 text-center">
                      Baik / Tidak
                    </td>
                    <td className="border border-black p-1 h-6"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1">3)</td>
                    <td className="border border-black p-1">
                      Tempat contoh uji / wadah
                    </td>
                    <td className="border border-black p-1 text-center">
                      Baik / Tidak
                    </td>
                    <td className="border border-black p-1 h-6"></td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 ml-7 underline">
                Waktu pelaksanaan pengujian maksimum .........................
                hari kerja *)
              </p>
            </div>

            <div className="w-1/2 mt-2.5">
              <p className="font-bold text-left">
                III. KAJI ULANG PERMINTAAN PENGUJIAN
              </p>
              <table className="w-full border-collapse border border-black ">
                <tbody>
                  <tr>
                    <td className="border border-black p-1 w-[2%] text-center">
                      1)
                    </td>
                    <td className="border border-black p-1 w-[10%]">
                      Kemampuan SDM
                    </td>
                    <td className="border border-black p-1 w-[1%] text-center">
                      :
                    </td>
                    <td className="border border-black p-1 w-[5%] text-left">
                      YA / TIDAK
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 w-[2%] text-center">
                      2)
                    </td>
                    <td className="border border-black p-1 w-[10%]">
                      Kesesuaian Metode
                    </td>
                    <td className="border border-black p-1 w-[1%] text-center">
                      :
                    </td>
                    <td className="border border-black p-1 w-[5%] text-left">
                      YA / TIDAK
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 w-[2%] text-center">
                      3)
                    </td>
                    <td className="border border-black p-1 w-[10%]">
                      Kemampuan Peralatan
                    </td>
                    <td className="border border-black p-1 w-[1%] text-center">
                      :
                    </td>
                    <td className="border border-black p-1 w-[5%] text-left">
                      YA / TIDAK
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 w-[2%] text-center">
                      4)
                    </td>
                    <td className="border border-black p-1 w-[10%]">
                      Kesimpulan
                    </td>
                    <td className="border border-black p-1 w-[1%] text-center">
                      :
                    </td>
                    <td className="border border-black p-1 w-[5%] text-left">
                      BISA / TIDAK BISA
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 w-full">
            <div className="border border-black h-12 mt-1 w-full">
              {" "}
              <p className="ml-1">Catatan :</p>
            </div>
          </div>

          {/* Bagian Tanda Tangan */}
          <div className="flex justify-between items-end mt-8 ml-30 mr-30">
            <div className="text-center">
              <p>PJ Teknis</p>
              <div className="h-16"></div>
              <p>..........................................</p>
            </div>
            <div className="text-center">
              <p>............, ..............</p>
              <p>Pelanggan</p>
              <div className="h-16"></div>
              <p>..........................................</p>
            </div>
          </div>

          <div className="text-[12px] mt-8 space-y-1">
            <p>
              <strong>Catatan :</strong>
            </p>
            <p>
              - Apabila terdapat perubahan yang mengakibatkan pengujian tidak
              dapat dilakukan atau disubkontrakkan, maka akan ada pemberitahuan
              dari Laboratorium DIL Kota Bekasi paling lambat 3 (tiga) hari
              kerja sejak Permintaan Pengujian diterima.
            </p>
            <p>
              *) Penerbitan Certificate Of Analysis (COA) maksimal 14 (empat
              belas) hari kerja setelah sampel diterima.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

FppsDocument.displayName = "FppsDocument";
