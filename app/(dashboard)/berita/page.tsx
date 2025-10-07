"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CariForm } from "./components/CariForm";
import { TitikPengujianForm } from "./components/TitikPengujianForm";
import { RincianForm } from "./components/RincianForm";
import { BapsPreviewDialog } from "./components/BapsPreviewDialog";
import { BapsDocument } from "./BapsDocument";
import { toast } from "sonner";
import { Printer, Save } from "lucide-react";
import { useLoading } from "@/components/context/LoadingContext";

export const dynamic = 'force-dynamic';

// Interface (tidak ada perubahan)
interface BapsData {
  nomorFpps: string;
  nomorBaps: string;
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
    signatureUrlLab: string;
    pihakPerusahaan: string;
    signatureUrlPerusahaan: string;
  };
}

export default function BeritaPage() {
  const [bapsData, setBapsData] = useState<BapsData | null>(null);
  const [fppsInput, setFppsInput] = useState("");
  const { isLoading, setIsLoading } = useLoading();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const riwayatId = searchParams.get('id');

  // useEffect untuk memuat data saat mode edit (tidak ada perubahan)
  useEffect(() => {
    if (riwayatId) {
      const fetchEditData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/riwayat/${riwayatId}`);
          setBapsData(res.data.dataForm);
          setFppsInput(res.data.dataForm.nomorFpps.replace("DIL-", ""));
          toast.info(`Mode Edit: Memuat data untuk ${res.data.nomor}`);
        } catch (error) {
          toast.error("Gagal memuat data untuk diedit.");
          router.push("/berita");
        } finally {
          setIsLoading(false);
        }
      };
      fetchEditData();
    }
  }, [riwayatId, router, setIsLoading]);

  const resetForm = () => {
    setBapsData(null);
    setFppsInput("");
    router.push("/berita");
  };

  const handleCariFpps = async () => {
    if (!fppsInput) return toast.error("Masukkan nomor FPPS");
    setIsLoading(true);
    setBapsData(null);
    const searchKey = fppsInput.startsWith("DIL-") ? fppsInput : `DIL-${fppsInput}`;
    try {
      const res = await fetch(`/api/fpps/${searchKey}`);
      if (!res.ok) throw new Error("Gagal mengambil data FPPS");
      const data = await res.json();
      const bulanRomawi = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
      const bulan = new Date().getMonth();
      const tahun = new Date().getFullYear();
      
      const fppsValue = data.formData.nomorFpps.replace("DIL-", "");
      const match = fppsValue.match(/^(\d+)(.*)$/);
      let nomorDasar = "";
      if (match) {
        const angkaUtama = match[1];
        const akhiran = match[2];
        const tigaDigitTerakhir = angkaUtama.slice(-3);
        nomorDasar = tigaDigitTerakhir + akhiran;
      } else {
        nomorDasar = fppsValue.slice(-3);
      }
      const nomorBaps = `${nomorDasar}/DIL/${bulanRomawi[bulan]}/${tahun}/BAPS`;

      setBapsData({
        nomorFpps: data.formData.nomorFpps,
        nomorBaps: nomorBaps,
        perusahaan: data.formData.namaPelanggan,
        alamat: data.formData.alamatPelanggan,
        noTelp: data.formData.noTelp,
        hariTanggal: "",
        titikPengujian: { udaraAmbien: "", emisiCerobong: "", pencahayaan: "", heatStress: "", udaraRuangKerja: "", kebauan: "", kebisingan: "", airLimbah: "" },
        // --- PERUBAHAN DI SINI ---
        rincianUji: data.rincian.map((item: any) => ({
          id: item.id,
          lokasi: item.area,
          parameter: item.parameter,
          regulasi: item.regulasi,
          jenisSampel: item.matriks || "", // Diambil dari data matriks
          waktuPengambilan: "",
        })),
        // --- AKHIR PERUBAHAN ---
        penandaTangan: { pihakLab: "", signatureUrlLab: "", pihakPerusahaan: "", signatureUrlPerusahaan: "" },
      });
      toast.success("Data FPPS berhasil dimuat.");
    } catch (err) {
      console.error(err);
      toast.error("Data tidak ditemukan atau terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sisa kode tidak ada perubahan...
  const handleBapsDataChange = useCallback((field: keyof BapsData, value: any) => {
      setBapsData(prev => prev ? { ...prev, [field]: value } : null);
  }, []);

  const handleRincianChange = useCallback((index: number, name: string, value: string) => {
    setBapsData(prev => {
      if (!prev) return null;
      const newRincian = [...prev.rincianUji];
      newRincian[index] = { ...newRincian[index], [name]: value };
      return { ...prev, rincianUji: newRincian };
    });
  }, []);

  const handlePenandaTanganChange = useCallback((field: keyof BapsData['penandaTangan'], value: string) => {
    setBapsData(prev => {
        if (!prev) return null;
        const newPenandaTangan = { ...prev.penandaTangan, [field]: value };
        return { ...prev, penandaTangan: newPenandaTangan };
    });
  }, []);

  const handleSignatureUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "signatureUrlLab" | "signatureUrlPerusahaan"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePenandaTanganChange(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!bapsData) return toast.error("Data Berita Acara belum dimuat.");
    setIsLoading(true);

    const riwayatPayload = {
      tipe: "berita_acara",
      nomor: bapsData.nomorBaps,
      judul: `Berita Acara - ${bapsData.perusahaan}`,
      dataForm: bapsData,
    };

    try {
      if (riwayatId) {
        await axios.put(`/api/riwayat/${riwayatId}`, riwayatPayload);
        toast.success("Berita Acara berhasil diperbarui!");
      } else {
        const updatePromise = axios.put(`/api/fpps/${bapsData.nomorFpps}`, { status: "analisis" });
        const saveToRiwayatPromise = axios.post("/api/riwayat", riwayatPayload);
        await Promise.all([updatePromise, saveToRiwayatPromise]);
        toast.success("Berita Acara berhasil disimpan dan status FPPS diupdate.");
      }
      router.push('/berita');
    } catch (error: any) {
      console.error("Save/Update Error:", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat menyimpan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 px-4 pt-6 md:px-8 lg:px-6">
      <div>
        <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
          {riwayatId ? "Edit Berita Acara" : "Berita Acara Pengambilan Sampel"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          {riwayatId ? "Ubah data yang diperlukan lalu simpan." : "Cari data berdasarkan Nomor FPPS untuk mengisi Berita Acara."}
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {!riwayatId && (
            <div className="rounded-lg border border-border p-4">
              <h2 className="mb-2 text-base font-medium">Cari Data FPPS</h2>
              <CariForm
                value={fppsInput}
                loading={isLoading}
                onChange={setFppsInput}
                onSubmit={handleCariFpps}
              />
            </div>
          )}

          {bapsData && (
            <>
              <div className="space-y-4 rounded-lg border border-border p-4">
                <h2 className="text-lg font-semibold">Informasi Umum</h2>
                  <div className="space-y-2">
                      <Label>Nomor Berita Acara</Label>
                      <Input value={bapsData.nomorBaps} readOnly disabled />
                  </div>
                  <div className="space-y-2">
                      <Label>Hari / Tanggal</Label>
                      <Input 
                        type="date" 
                        value={bapsData.hariTanggal} 
                        onChange={(e) => handleBapsDataChange('hariTanggal', e.target.value)}
                      />
                  </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <TitikPengujianForm
                  data={bapsData.titikPengujian}
                  onChange={(newData) => handleBapsDataChange('titikPengujian', newData)}
                />
              </div>
              <div className="rounded-lg border border-border p-4">
                <RincianForm
                  rincianUji={bapsData.rincianUji}
                  onChange={(index, e) => handleRincianChange(index, e.target.name, e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-border p-4">
                  <h2 className="text-lg font-semibold mb-4">Penanda Tangan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Pihak Laboratorium</Label>
                        <Input value={bapsData.penandaTangan.pihakLab} onChange={(e) => handlePenandaTanganChange('pihakLab', e.target.value)} />
                        <Label htmlFor="sig-lab" className="text-sm text-muted-foreground">Tanda Tangan (PNG)</Label>
                        <Input id="sig-lab" type="file" accept="image/png" onChange={(e) => handleSignatureUpload(e, 'signatureUrlLab')} />
                    </div>
                    <div className="space-y-2">
                        <Label>Pihak Perusahaan</Label>
                        <Input value={bapsData.penandaTangan.pihakPerusahaan} onChange={(e) => handlePenandaTanganChange('pihakPerusahaan', e.target.value)} />
                        <Label htmlFor="sig-perusahaan" className="text-sm text-muted-foreground">Tanda Tangan (PNG)</Label>
                        <Input id="sig-perusahaan" type="file" accept="image/png" onChange={(e) => handleSignatureUpload(e, 'signatureUrlPerusahaan')} />
                    </div>
                  </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </>
          )}
        </div>

        {bapsData && (
          <div className="print-only">
            <BapsDocument data={bapsData} />
          </div>
        )}
      </div>

      {bapsData && (
        <BapsPreviewDialog
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onPrint={() => window.print()}
          data={bapsData}
        />
      )}
    </div>
  );
}