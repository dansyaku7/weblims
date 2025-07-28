"use client";

import React from "react";
// ... (import lainnya tidak berubah)
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Printer, XCircle } from "lucide-react";

interface Sampel {
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

interface FormPengujianProps {
  nomorFpps: string;
  setNomorFpps: (value: string) => void;
  nomorSurat: string;
  petugas: string[];
  setPetugas: (petugas: string[]) => void;
  sampelData: Sampel[];
  setSampelData: (data: Sampel[]) => void;
  signatureData: SignatureData;
  setSignatureData: (
    data: SignatureData | ((prev: SignatureData) => SignatureData)
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onPrint: () => void;
}

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export default function FormPengujian({
  nomorFpps,
  setNomorFpps,
  nomorSurat,
  petugas,
  setPetugas,
  sampelData,
  setSampelData,
  signatureData,
  setSignatureData,
  onSubmit,
  onPrint,
}: FormPengujianProps) {
  const handleNomorFppsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.startsWith("DIL-") ? value.slice(4) : value;
    if (/^\d*$/.test(onlyNumber)) {
      setNomorFpps(onlyNumber);
    }
  };

  const handlePetugasChange = (index: number, value: string) => {
    const newPetugas = [...petugas];
    newPetugas[index] = value;
    setPetugas(newPetugas);
  };

  const addPetugas = () => setPetugas([...petugas, ""]);

  const removePetugas = (index: number) => {
    if (petugas.length > 1) {
      setPetugas(petugas.filter((_, i) => i !== index));
    }
  };

  const handleSampelChange = (
    index: number,
    field: keyof Sampel,
    value: string
  ) => {
    const newSampelData = [...sampelData];
    newSampelData[index] = { ...newSampelData[index], [field]: value };
    setSampelData(newSampelData);
  };

  const handleSignatureChange = (field: keyof SignatureData, value: string) => {
    setSignatureData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignatureUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "signatureUrlAdmin" | "signatureUrlPj"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureData((prev) => ({
          ...prev,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Form Surat Tugas Pengujian</CardTitle>
          <CardDescription>
            Isi detail di bawah ini untuk membuat surat tugas pengujian sampel.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <FormSection title="">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nomorFpps">Nomor FPPS</Label>
                <Input
                  id="nomorFpps"
                  value={`DIL-${nomorFpps}`}
                  onChange={handleNomorFppsChange}
                  placeholder="Ketik nomornya saja"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomorSurat">Nomor Surat (Otomatis)</Label>
                <Input id="nomorSurat" value={nomorSurat} readOnly disabled />
              </div>
            </div>
          </FormSection>

          <FormSection title="Petugas Ditugaskan">
            <div className="space-y-2">
              {petugas.map((nama, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder={`Nama Petugas ${index + 1}`}
                    value={nama}
                    onChange={(e) => handlePetugasChange(index, e.target.value)}
                    required
                  />
                  {petugas.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePetugas(index)}
                      className="shrink-0 text-destructive hover:bg-destructive/10"
                      aria-label="Hapus Petugas"
                    >
                      <XCircle size={20} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={addPetugas}
              variant="outline"
              size="sm"
            >
              <PlusCircle size={16} className="mr-2" />
              Tambah Petugas
            </Button>
          </FormSection>

          <FormSection title="Detail Pengujian Sampel">
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Sampel ID</TableHead>
                    <TableHead className="min-w-[250px]">
                      Parameter Uji
                    </TableHead>
                    <TableHead className="min-w-[150px]">Tipe Sampel</TableHead>
                    <TableHead className="min-w-[150px]">Deadline</TableHead>
                    <TableHead className="min-w-[200px]">Keterangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampelData.length > 0 ? (
                    sampelData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.parameter}</TableCell>
                        <TableCell>
                          <Input
                            value={row.tipeSampel}
                            onChange={(e) =>
                              handleSampelChange(
                                index,
                                "tipeSampel",
                                e.target.value
                              )
                            }
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={row.deadline}
                            onChange={(e) =>
                              handleSampelChange(
                                index,
                                "deadline",
                                e.target.value
                              )
                            }
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={row.keterangan}
                            onChange={(e) =>
                              handleSampelChange(
                                index,
                                "keterangan",
                                e.target.value
                              )
                            }
                            className="h-8"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-muted-foreground"
                      >
                        Data sampel akan muncul di sini.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </FormSection>

          <FormSection title="Penanggung Jawab">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Admin</Label>
                <Input
                  placeholder="Nama Lengkap Admin"
                  value={signatureData.admin}
                  onChange={(e) =>
                    handleSignatureChange("admin", e.target.value)
                  }
                />
                <Label
                  htmlFor="signature-admin"
                  className="text-sm text-muted-foreground"
                >
                  Tanda Tangan (PNG)
                </Label>
                <Input
                  id="signature-admin"
                  type="file"
                  accept="image/png"
                  onChange={(e) =>
                    handleSignatureUpload(e, "signatureUrlAdmin")
                  }
                  className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <div className="space-y-2">
                <Label>PJ Teknis</Label>
                <Input
                  placeholder="Nama Lengkap PJ Teknis"
                  value={signatureData.pjTeknis}
                  onChange={(e) =>
                    handleSignatureChange("pjTeknis", e.target.value)
                  }
                />
                <Label
                  htmlFor="signature-pj"
                  className="text-sm text-muted-foreground"
                >
                  Tanda Tangan (PNG)
                </Label>
                <Input
                  id="signature-pj"
                  type="file"
                  accept="image/png"
                  onChange={(e) => handleSignatureUpload(e, "signatureUrlPj")}
                  className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
            </div>
          </FormSection>
        </CardContent>
        <CardFooter className="flex justify-end border-t px-6 py-4 gap-2">
          <Button type="submit">Simpan</Button>
          <Button type="button" onClick={onPrint}>
            <Printer className="h-5 w-5 mr-2" />
            Print
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
