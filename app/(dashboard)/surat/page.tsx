"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import FormSurat from "./components/FormSurat";
import PreviewDialog from "./components/PreviewDialog";
import { StpsDocument } from "./components/StpsDocument";
import { useLoading } from "@/components/context/LoadingContext";

// Interface untuk tipe data state
interface NomorSuratState {
  nomorFpps: string;
  nomorStpsLengkap: string;
}
interface CustomerDataState {
  hariTanggal: string;
  namaPelanggan: string;
  alamat: string;
  contactPerson: string;
}
interface SignatureDataState {
  pjTeknis: string;
  signatureUrl: string;
}

// Nilai awal untuk state
const initialNomorSurat: NomorSuratState = {
  nomorFpps: "",
  nomorStpsLengkap: "",
};
const initialCustomerData: CustomerDataState = {
  hariTanggal: "",
  namaPelanggan: "",
  alamat: "",
  contactPerson: "",
};
const initialSignatureData: SignatureDataState = {
  pjTeknis: "",
  signatureUrl: "",
};

export default function SuratPage() {
  const [nomorSurat, setNomorSurat] = useState<NomorSuratState>(initialNomorSurat);
  const [customerData, setCustomerData] = useState<CustomerDataState>(initialCustomerData);
  const [petugas, setPetugas] = useState<string[]>([""]);
  const [signatureData, setSignatureData] = useState<SignatureDataState>(initialSignatureData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoading();

  const searchParams = useSearchParams();
  const router = useRouter();
  const riwayatId = searchParams.get('id'); // Ambil ID dari URL

  // Effect untuk generate nomor STPS dari nomor FPPS
  useEffect(() => {
    if (nomorSurat.nomorFpps) {
      const bulanRomawi = [
        "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
      ];
      const bulan = new Date().getMonth();
      const tahun = new Date().getFullYear();
      const last3 = nomorSurat.nomorFpps.slice(-3);
      const formattedNomor = `${last3[0]}.${last3.slice(1)}`;
      setNomorSurat((prev) => ({
        ...prev,
        nomorStpsLengkap: `${formattedNomor}/DIL/${bulanRomawi[bulan]}/${tahun}/STPS`,
      }));
    } else {
      setNomorSurat((prev) => ({ ...prev, nomorStpsLengkap: "" }));
    }
  }, [nomorSurat.nomorFpps]);

  // Effect untuk fetch data FPPS saat membuat surat baru
  useEffect(() => {
    if (!nomorSurat.nomorFpps || riwayatId) return; // Jangan fetch jika dalam mode edit
    const fetchFppsData = async () => {
      try {
        const res = await fetch(`/api/fpps/DIL-${nomorSurat.nomorFpps}`);
        if (!res.ok) throw new Error("Nomor FPPS tidak ditemukan");
        const result = await res.json();
        setCustomerData({
          hariTanggal: result.formData.tanggalMasuk || "",
          namaPelanggan: result.formData.namaPelanggan || "",
          alamat: result.formData.alamatPelanggan || "",
          contactPerson: "",
        });
        setPetugas(result.formData.petugas || [""]);
      } catch (error) {
        console.error("Gagal mengambil data FPPS:", error);
        setCustomerData(initialCustomerData);
        setPetugas([""]);
      }
    };
    fetchFppsData();
  }, [nomorSurat.nomorFpps, riwayatId]);
  
  // Effect untuk fetch data riwayat jika dalam mode edit
  useEffect(() => {
    if (riwayatId) {
      const fetchRiwayatData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/riwayat/${riwayatId}`);
          const { dataForm } = res.data;
          
          setNomorSurat(dataForm.nomorSurat);
          setCustomerData(dataForm.customerData);
          setPetugas(dataForm.petugas);
          setSignatureData(dataForm.signatureData);
          toast.info(`Mode Edit: Memuat data untuk ${dataForm.nomorSurat.nomorStpsLengkap}`);
        } catch (error) {
          toast.error("Gagal memuat data untuk diedit.");
          router.push("/surat"); // Kembali jika gagal
        } finally {
          setIsLoading(false);
        }
      };
      fetchRiwayatData();
    }
  }, [riwayatId, setIsLoading, router]);


  const resetForm = () => {
    setNomorSurat(initialNomorSurat);
    setCustomerData(initialCustomerData);
    setPetugas([""]);
    setSignatureData(initialSignatureData);
    router.push('/surat'); // Arahkan ke halaman surat bersih setelah reset
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomorSurat.nomorFpps || !nomorSurat.nomorStpsLengkap) {
      toast.error("Nomor FPPS dan Nomor STPS harus terisi.");
      return;
    }
    setIsLoading(true);

    const formDataToSave = { nomorSurat, customerData, petugas, signatureData };
    const riwayatPayload = {
      tipe: "surat_tugas",
      nomor: nomorSurat.nomorStpsLengkap,
      judul: `Surat Tugas - ${customerData.namaPelanggan}`,
      dataForm: formDataToSave,
    };

    try {
      if (riwayatId) {
        // --- MODE UPDATE ---
        await axios.put(`/api/riwayat/${riwayatId}`, riwayatPayload);
        toast.success("Dokumen berhasil diperbarui!");
        router.push('/riwayat'); // Kembali ke halaman riwayat setelah update
      } else {
        // --- MODE CREATE ---
        const saveToRiwayatPromise = axios.post("/api/riwayat", riwayatPayload);
        const updateStatusPromise = axios.put(`/api/fpps/DIL-${nomorSurat.nomorFpps}`, { status: "penyuratan" });
        await Promise.all([saveToRiwayatPromise, updateStatusPromise]);
        toast.success("Dokumen berhasil disimpan ke riwayat.");
        resetForm();
      }
    } catch (error: any) {
      console.error("Save/Update Error:", error);
      toast.error(error.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    if (!nomorSurat.nomorFpps) {
      toast.error("Isi dan simpan data terlebih dahulu untuk mencetak.");
      return;
    }
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-8 px-4 pt-6 md:px-8 lg:px-6">
      <div>
        <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
          {riwayatId ? "Edit Surat Tugas" : "Surat Tugas Pengambilan Sampel"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          {riwayatId ? "Ubah data yang diperlukan lalu simpan." : "Isi data untuk menerbitkan STPS. Data akan ditarik dari FPPS."}
        </p>
      </div>
      <div className="grid grid-cols-1 items-start lg:grid-cols-2">
        <FormSurat
          nomorSurat={nomorSurat}
          setNomorSurat={setNomorSurat}
          customerData={customerData}
          setCustomerData={setCustomerData}
          petugas={petugas}
          setPetugas={setPetugas}
          signatureData={signatureData}
          setSignatureData={setSignatureData}
          onSubmit={handleSave}
          onPrint={handlePrint}
          isEditMode={!!riwayatId} // Kirim prop isEditMode
        />
        <div className="print-only">
          <StpsDocument
            ref={documentRef}
            nomorSurat={nomorSurat.nomorStpsLengkap}
            data={{
              ...customerData,
              petugas: petugas.filter((p) => p.trim() !== ""),
              ...signatureData,
            }}
          />
        </div>
      </div>
      <PreviewDialog
        open={isPreviewOpen}
        setOpen={setIsPreviewOpen}
        handlePrint={() => window.print()}
      />
    </div>
  );
}
