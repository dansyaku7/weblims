"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import FormPengujian from "./components/FormPengujian";
import PreviewDialog from "./components/PreviewDialog";
import { PengujianDocumment } from "./components/PengujianDocument";
import { useLoading } from "@/components/context/LoadingContext";

// Interface untuk tipe data state
interface SampleRow {
  id: string;
  parameter: string;
  tipeSampel: string;
  deadline: string;
  keterangan: string;
}

interface SignatureData {
  admin: string;
  signatureUrlAdmin: string;
  pjTeknis: string;
  signatureUrlPj: string;
}

// Nilai awal untuk state
const initialSignatureData: SignatureData = {
  admin: "",
  signatureUrlAdmin: "",
  pjTeknis: "",
  signatureUrlPj: "",
};

export default function SuratPengujianPage() {
  const [nomorFpps, setNomorFpps] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [petugas, setPetugas] = useState([""]);
  const [sampelData, setSampelData] = useState<SampleRow[]>([]);
  const [signatureData, setSignatureData] =
    useState<SignatureData>(initialSignatureData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoading();
  const router = useRouter();
  const searchParams = useSearchParams();
  const riwayatId = searchParams.get('id'); // Ambil ID dari URL

  // Effect untuk generate nomor surat (hanya jika mode create)
  useEffect(() => {
    if (nomorFpps && !riwayatId) {
      const bulanRomawi = [
        "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
      ];
      const bulan = new Date().getMonth();
      const tahun = new Date().getFullYear();
      const last3 = nomorFpps.slice(-3);
      const formattedNomor = `${last3[0]}.${last3.slice(1)}`;
      setNomorSurat(`${formattedNomor}/DIL/${bulanRomawi[bulan]}/${tahun}/STP`);
    } else if (!nomorFpps) {
      setNomorSurat("");
    }
  }, [nomorFpps, riwayatId]);

  // Effect untuk fetch data FPPS (hanya jika mode create)
  useEffect(() => {
    if (!nomorFpps || riwayatId) {
      if (!riwayatId) {
          setPetugas([""]);
          setSampelData([]);
      }
      return;
    }
    const fetchFppsData = async () => {
      try {
        const res = await fetch(`/api/fpps/DIL-${nomorFpps}`);
        if (!res.ok) throw new Error("Nomor FPPS tidak ditemukan");
        const result = await res.json();
        const formData = result.formData;
        const rincianData = result.rincian;
        if (!formData || !rincianData) {
          throw new Error("Struktur data dari API tidak lengkap.");
        }
        setPetugas(formData.petugas || [""]);
        if (rincianData && Array.isArray(rincianData)) {
          const initialSampelData = rincianData.map((sample: any) => ({
            id: sample.sampleId || sample.sampelId || sample.id || "N/A",
            parameter: Array.isArray(sample.parameterUji)
              ? sample.parameterUji.join(", ")
              : sample.parameter || "N/A",
            tipeSampel: "",
            deadline: "",
            keterangan: "",
          }));
          setSampelData(initialSampelData);
          if (initialSampelData.length > 0) {
            toast.success("Data FPPS berhasil dimuat.");
          }
        } else {
          setSampelData([]);
        }
      } catch (error: any) {
        toast.error(`Gagal memuat data FPPS: ${error.message}`);
        setPetugas([""]);
        setSampelData([]);
      }
    };
    const handler = setTimeout(() => {
      fetchFppsData();
    }, 800);
    return () => {
      clearTimeout(handler);
    };
  }, [nomorFpps, riwayatId]);

  // Effect untuk memuat data saat mode edit
  useEffect(() => {
    if (riwayatId) {
      const fetchEditData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/riwayat/${riwayatId}`);
          const { dataForm } = res.data;
          
          setNomorFpps(dataForm.nomorFpps);
          setNomorSurat(dataForm.nomorSurat);
          setPetugas(dataForm.petugas);
          setSampelData(dataForm.sampelData);
          setSignatureData(dataForm.signatureData);

          toast.info(`Mode Edit: Memuat data untuk ${dataForm.nomorSurat}`);
        } catch (error) {
          toast.error("Gagal memuat data untuk diedit.");
          router.push("/pengujian");
        } finally {
          setIsLoading(false);
        }
      };
      fetchEditData();
    }
  }, [riwayatId, router, setIsLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomorFpps || !nomorSurat) {
      toast.error("Nomor FPPS harus diisi untuk menghasilkan Nomor Surat.");
      return;
    }
    setIsLoading(true);

    const formDataToSave = {
      nomorFpps,
      nomorSurat,
      petugas,
      sampelData,
      signatureData,
    };

    const riwayatPayload = {
      tipe: "surat_pengujian",
      nomor: nomorSurat,
      judul: `Surat Pengujian - ${nomorSurat}`,
      dataForm: formDataToSave,
    };

    try {
      if (riwayatId) {
        // --- MODE UPDATE ---
        await axios.put(`/api/riwayat/${riwayatId}`, riwayatPayload);
        toast.success("Dokumen berhasil diperbarui!");
      } else {
        // --- MODE CREATE ---
        const updateStatusPromise = axios.put(`/api/fpps/DIL-${nomorFpps}`, {
          status: "sampling",
        });
        const saveToRiwayatPromise = axios.post("/api/riwayat", riwayatPayload);
        await Promise.all([updateStatusPromise, saveToRiwayatPromise]);
        toast.success("Surat pengujian berhasil disimpan!");
      }
      router.push('/riwayat'); // Arahkan ke riwayat setelah create atau update
    } catch (error: any) {
      console.error("Save/Update Error:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPrint = () => {
    if (!nomorFpps) {
      toast.error("Isi dan simpan data terlebih dahulu untuk mencetak.");
      return;
    }
    setIsPreviewOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 px-4 py-6 md:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {riwayatId ? "Edit Surat Tugas Pengujian" : "Surat Tugas Pengujian Sampel"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          {riwayatId ? "Ubah data yang diperlukan lalu simpan." : "Isi data untuk menerbitkan Surat Tugas Pengujian (STP)."}
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <FormPengujian
          nomorFpps={nomorFpps}
          setNomorFpps={setNomorFpps}
          nomorSurat={nomorSurat}
          petugas={petugas}
          setPetugas={setPetugas}
          sampelData={sampelData}
          setSampelData={setSampelData}
          signatureData={signatureData}
          setSignatureData={setSignatureData}
          onSubmit={handleSave} 
          onPrint={handleRequestPrint}
          isEditMode={!!riwayatId}
        />

        <div className="print-only">
          <PengujianDocumment
            ref={documentRef}
            nomorSurat={nomorSurat}
            petugas={petugas.filter((p) => p.trim() !== "")}
            sampelData={sampelData}
            signatureData={signatureData}
          />
        </div>
      </div>

      <PreviewDialog
        open={isPreviewOpen}
        setOpen={setIsPreviewOpen}
        handlePrint={handlePrint}
      />
    </div>
  );
}
