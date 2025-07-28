"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Pencil,
  Eye,
  EyeOff,
  Settings,
  ChevronLeft,
  Save,
  FileSearch,
} from "lucide-react";

// Interface tetap sama
interface ParameterResult {
  name: string;
  category?: string;
  testingResult: string;
  unit: string;
  standard: string;
  method: string;
  isVisible: boolean;
}

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
  notes: string;
}

interface Template {
  results: ParameterResult[];
  sampleInfo: SampleInfo;
  showKanLogo: boolean;
}

// 1. TAMBAHKAN PROPS BARU DI SINI
interface WastewaterFormProps {
  template: Template;
  nomorFppsPrefix: string; // <-- Props baru untuk awalan No. Sampel
  onTemplateChange: (template: Template) => void;
  onSave: (template: Template) => void;
  onBack: () => void;
  onPreview: () => void;
}

interface RenderFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  isEditable?: boolean;
  type?: "input" | "textarea";
}

export function WastewaterForm({
  template,
  nomorFppsPrefix, // <-- 2. Terima props baru
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: WastewaterFormProps) {
  // ... (fungsi handleParameterChange tetap sama)
  const handleParameterChange = (
    index: number,
    field: keyof ParameterResult,
    value: string | boolean
  ) => {
    const newResults = [...template.results];
    newResults[index] = { ...newResults[index], [field]: value };
    onTemplateChange({ ...template, results: newResults });
  };


  const handleSampleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
  };

  // 3. BUAT FUNGSI BARU UNTUK MENGELOLA SUFFIX NO. SAMPEL
  const handleSampleNoSuffixChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const suffix = e.target.value;
    // Gabungkan prefix dengan suffix baru untuk membentuk No. Sampel yang lengkap
    const newSampleNo = `${nomorFppsPrefix}${suffix}`;

    // Update state dengan No. Sampel yang sudah lengkap
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, sampleNo: newSampleNo },
    });
  };

  // 4. BUAT VARIABEL UNTUK MENGAMBIL NILAI SUFFIX DARI STATE
  const sampleNoSuffix = template.sampleInfo.sampleNo.startsWith(nomorFppsPrefix)
    ? template.sampleInfo.sampleNo.substring(nomorFppsPrefix.length)
    : "";


  const renderField = ({
    // ... (fungsi renderField tetap sama)
  }: RenderFieldProps) => {
    // ...
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Detail & Hasil Tes Air Limbah (Wastewater)</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Informasi Sampel & Catatan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">

            {/* --- BAGIAN INI DIUBAH TOTAL --- */}
            <div>
              <Label htmlFor="sampleNo" className="text-sm font-medium">
                Sampel No.
              </Label>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm h-10">
                  {nomorFppsPrefix}
                </span>
                <Input
                  id="sampleNo"
                  name="sampleNoSuffix"
                  value={sampleNoSuffix}
                  onChange={handleSampleNoSuffixChange}
                  placeholder=".01"
                  className="rounded-l-none bg-transparent border border-input text-foreground"
                />
              </div>
            </div>
            {/* ----------------------------- */}

            {renderField({
              label: "Lokasi Sampling",
              id: "samplingLocation",
              value: template.sampleInfo.samplingLocation,
              onChange: handleSampleInfoChange,
            })}
            {renderField({
              label: "Waktu Sampling",
              id: "samplingTime",
              value: template.sampleInfo.samplingTime,
              onChange: handleSampleInfoChange,
            })}
          </div>
          <div className="pt-2">
            {renderField({
              label: "Catatan Kaki (Standar Baku Mutu)",
              id: "notes",
              value: template.sampleInfo.notes,
              onChange: handleSampleInfoChange,
              type: "textarea",
              placeholder: "Contoh: *) Minister of Environmental Decree...",
            })}
          </div>
        </div>

        {/* ... (sisa kode biarkan sama persis) ... */}
        
      </CardContent>
      {/* ... (sisa kode biarkan sama persis) ... */}
    </Card>
  );
}

// NOTE: Karena kode di bawahnya sangat panjang dan tidak ada perubahan, 
// saya potong di sini untuk keringkasan. Cukup ubah bagian atas saja.