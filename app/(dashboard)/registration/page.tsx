"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import FormDasar from "./components/FormDasar";
import FormRincian from "./components/FormRincian";
import { FppsDocument } from "./components/FppsDocument";
import { toast } from "sonner";
import { useLoading } from "@/components/context/LoadingContext";

interface RincianItem {
  id: string;
  area: string;
  matriks: string;
  parameter: string;
  regulasi: string;
  metode: string;
}

const initialFormData = {
  nomorFpps: "",
  nomorQuotation: "",
  petugas: [""],
  namaPelanggan: "",
  alamatPelanggan: "",
  noTelp: "",
  tanggalMasuk: "",
  kegiatan: "",
  namaPpic: "",
  emailPpic: "",
};

const initialRincian: RincianItem[] = [];

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [rincian, setRincian] = useState(initialRincian);
  const { setIsLoading } = useLoading();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setFormData(initialFormData);
    setRincian(initialRincian);
    setStep(1);
  };

  const handleSimpanDanPreview = async () => {
    const nomorFppsFinal = `DIL-${formData.nomorFpps}`;
    const payload = {
      formData: { ...formData, nomorFpps: nomorFppsFinal },
      rincian,
    };

    setIsLoading(true);
    try {
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 500));

      await Promise.all([axios.post("/api/fpps", payload), minimumDelay]);

      toast.success(`Data untuk ${nomorFppsFinal} berhasil disimpan!`);
      resetForm();
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Gagal menyimpan: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="px-4 pt-6 md:px-8 lg:px-6">
        <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
          Form Pendaftaran Pengujian Sampling
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Silakan isi data pelanggan dan rincian pengujian secara lengkap di
          bawah ini.
        </p>
      </div>

      {step === 1 ? (
        <FormDasar
          formData={formData}
          setFormData={setFormData}
          goToStep2={() => setStep(2)}
        />
      ) : (
        <FormRincian
          formData={formData}
          rincian={rincian}
          setRincian={setRincian}
          goBack={() => setStep(1)}
          onSubmit={handleSimpanDanPreview}
          onPrint={handlePrint}
        />
      )}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-background text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pratinjau Dokumen</DialogTitle>
            <DialogDescription>
              Dokumen siap dicetak. Klik tombol Print untuk melanjutkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPreviewOpen(false)}
            >
              Batal
            </Button>
            <Button type="button" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="print-only">
        <FppsDocument
          data={{
            ...formData,
            nomorFpps: `DIL-${formData.nomorFpps}`,
            petugas: formData.petugas,
            rincian,
          }}
        />
      </div>
      <style>
        {`
          @media print {
            @page {
              size: letter landscape;
              margin: 0;
            }
            body {
              margin: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print-only {
              display: block;
            }
            body * {
              visibility: hidden;
            }
            .print-only, .print-only * {
              visibility: visible;
            }
            .print-only {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            button, [data-no-print] {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
