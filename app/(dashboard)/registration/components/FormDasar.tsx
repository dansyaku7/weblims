"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { PlusCircle, XCircle } from "lucide-react";

type FormDasarProps = {
  formData: {
    nomorFpps: string;
    nomorQuotation: string;
    namaPelanggan: string;
    noTelp: string;
    alamatPelanggan: string;
    kegiatan: string;
    tanggalMasuk: string;
    petugas: string[];
    namaPpic: string;
    emailPpic: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<FormDasarProps["formData"]>>;
  goToStep2: () => void;
};

export default function FormDasar({
  formData,
  setFormData,
  goToStep2,
}: FormDasarProps) {
  const [petugasList, setPetugasList] = useState<string[]>(
    formData.petugas || [""]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "nomorFpps") {
      const fppsValue = value.startsWith("DIL-") ? value.slice(4) : value;
      // Memperbolehkan input angka, huruf, dan titik
      if (/^[\d.a-zA-Z]*$/.test(fppsValue)) {
        setFormData((prev) => ({ ...prev, [name]: fppsValue }));
      }
    } else if (!["petugas"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePetugasChange = (index: number, value: string) => {
    const updated = [...petugasList];
    updated[index] = value;
    setPetugasList(updated);
    setFormData((prev) => ({ ...prev, petugas: updated }));
  };

  const addPetugas = () => {
    setPetugasList([...petugasList, ""]);
  };

  const removePetugas = (index: number) => {
    const filtered = petugasList.filter((_, i) => i !== index);
    setPetugasList(filtered);
    setFormData((prev) => ({ ...prev, petugas: filtered }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        goToStep2();
      }}
    >
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="nomorFpps"
              className="text-sm font-medium text-foreground"
            >
              Nomor FPPS
            </Label>
            <Input
              id="nomorFpps"
              name="nomorFpps"
              value={`DIL-${formData.nomorFpps}`}
              onChange={handleChange}
              required
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="nomorQuotation"
              className="text-sm font-medium text-foreground"
            >
              Nomor Quotation
            </Label>
            <Input
              name="nomorQuotation"
              value={formData.nomorQuotation}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Petugas
            </Label>
            <div className="space-y-3">
              {petugasList.map((nama, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Label className="w-5 text-sm font-medium text-foreground">
                    {index + 1}.
                  </Label>
                  <Input
                    type="text"
                    placeholder={`Nama Petugas ${index + 1}`}
                    value={nama}
                    onChange={(e) => handlePetugasChange(index, e.target.value)}
                    required
                    className="flex-1 bg-transparent border border-input text-foreground mt-1"
                  />
                  {petugasList.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePetugas(index)}
                      className="text-red-500 hover:bg-red-500/10"
                    >
                      <XCircle size={20} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addPetugas}
                variant="outline"
                className="mt-2 ml-8 flex items-center gap-2"
              >
                <PlusCircle size={18} /> Tambah Petugas
              </Button>
            </div>
          </div>
          <div>
            <Label
              htmlFor="kegiatan"
              className="text-sm font-medium text-foreground"
            >
              Kegiatan/Paket Pekerjaan
            </Label>
            <Input
              name="kegiatan"
              value={formData.kegiatan}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="tanggalMasuk"
              className="text-sm font-medium text-foreground"
            >
              Tanggal Masuk
            </Label>
            <Input
              type="date"
              name="tanggalMasuk"
              value={formData.tanggalMasuk}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="namaPelanggan"
              className="text-sm font-medium text-foreground"
            >
              Nama Pelanggan
            </Label>
            <Input
              name="namaPelanggan"
              value={formData.namaPelanggan}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="namaPpic"
              className="text-sm font-medium text-foreground"
            >
              Nama PPIC
            </Label>
            <Input
              name="namaPpic"
              value={formData.namaPpic}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="emailPpic"
              className="text-sm font-medium text-foreground"
            >
              Email PPIC
            </Label>
            <Input
              type="text"
              name="emailPpic"
              value={formData.emailPpic}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="noTelp"
              className="text-sm font-medium text-foreground"
            >
              No. Telp/HP
            </Label>
            <Input
              name="noTelp"
              value={formData.noTelp}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="alamatPelanggan"
              className="text-sm font-medium text-foreground"
            >
              Alamat Pelanggan
            </Label>
            <Textarea
              name="alamatPelanggan"
              value={formData.alamatPelanggan}
              onChange={handleChange}
              className="bg-transparent border border-input text-foreground mt-1"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end px-6 py-4">
        <Button type="submit">Selanjutnya</Button>
      </CardFooter>
    </form>
  );
}