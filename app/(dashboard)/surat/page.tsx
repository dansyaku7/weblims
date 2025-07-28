"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import FormSurat from "./components/FormSurat";
import PreviewDialog from "./components/PreviewDialog";
import { StpsDocument } from "./components/StpsDocument";
import { useLoading } from "@/components/context/LoadingContext";

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
  const [nomorSurat, setNomorSurat] =
    useState<NomorSuratState>(initialNomorSurat);
  const [customerData, setCustomerData] =
    useState<CustomerDataState>(initialCustomerData);
  const [petugas, setPetugas] = useState<string[]>([""]);
  const [signatureData, setSignatureData] =
    useState<SignatureDataState>(initialSignatureData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoading();

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

  useEffect(() => {
    if (!nomorSurat.nomorFpps) return;
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
  }, [nomorSurat.nomorFpps]);

  const resetForm = () => {
    setNomorSurat(initialNomorSurat);
    setCustomerData(initialCustomerData);
    setPetugas([""]);
    setSignatureData(initialSignatureData);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomorSurat.nomorFpps || !nomorSurat.nomorStpsLengkap) {
      toast.error("Nomor FPPS dan Nomor STPS harus terisi.");
      return;
    }

    setIsLoading(true);

    // Kumpulkan semua data form menjadi satu objek
    const formDataToSave = {
      nomorSurat,
      customerData,
      petugas,
      signatureData,
    };
    
    // Siapkan payload untuk dikirim ke API riwayat
    const riwayatPayload = {
      tipe: "surat_tugas", // Tandai sebagai 'surat_tugas'
      nomor: nomorSurat.nomorStpsLengkap,
      judul: `Surat Tugas - ${customerData.namaPelanggan}`,
      tanggal: new Date(),
      dataForm: formDataToSave, // Simpan semua data form sebagai JSON
    };

    try {
      // Kirim data ke API riwayat secara paralel dengan update status
      const saveToRiwayatPromise = axios.post("/api/riwayat", riwayatPayload);
      const updateStatusPromise = axios.put(`/api/fpps/DIL-${nomorSurat.nomorFpps}`, {
        status: "penyuratan",
      });
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 500));

      // Tunggu semua promise selesai
      await Promise.all([saveToRiwayatPromise, updateStatusPromise, minimumDelay]);

      toast.success("Dokumen berhasil disimpan ke riwayat dan status FPPS diupdate.");
      resetForm();
    } catch (error: any) {
      console.error("Save/Update Error:", error);
      toast.error(
        error.response?.data?.message || "Gagal menyimpan data atau memperbarui status."
      );
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
          Surat Tugas Pengambilan Sampel
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Isi data untuk menerbitkan STPS. Data akan ditarik dari FPPS.
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