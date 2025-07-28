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
import {
  PlusCircle,
  Trash2,
  ChevronLeft,
  Save,
  FileSearch,
  Settings, // <-- Import Settings
} from "lucide-react";
import { nanoid } from "nanoid";
import { defaultHeatStressRow } from "../data/heatstress-data";
import { Switch } from "@/components/ui/switch"; // <-- Import Switch

interface HeatStressResultRow {
  id: string;
  location: string;
  time: string;
  humidity: string | number;
  wetTemp: string | number;
  dewTemp: string | number;
  globeTemp: string | number;
}

interface SampleInfo {
  sampleNo: string;
}

// 1. TAMBAHKAN showKanLogo
interface HeatStressTemplate {
  sampleInfo: SampleInfo;
  results: HeatStressResultRow[];
  showKanLogo: boolean; // <-- Tambahkan ini
}

interface HeatStressFormProps {
  template: HeatStressTemplate;
  nomorFppsPrefix: string;
  onTemplateChange: (template: HeatStressTemplate) => void;
  onSave: (template: HeatStressTemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

interface RenderFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function HeatStressForm({
  template,
  nomorFppsPrefix,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: HeatStressFormProps) {
  const handleChange = (
    index: number,
    field: keyof Omit<HeatStressResultRow, "id">,
    value: string | number
  ) => {
    const newResults = [...template.results];
    if (index >= 0 && index < newResults.length) {
      newResults[index] = { ...newResults[index], [field]: value };
      onTemplateChange({ ...template, results: newResults });
    }
  };

  const handleAddRow = () => {
    const newRow: HeatStressResultRow = {
      id: nanoid(),
      ...defaultHeatStressRow,
    };
    const newResults = [...template.results, newRow];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveRow = (index: number) => {
    const newResults = template.results.filter((_, i) => i !== index);
    onTemplateChange({ ...template, results: newResults });
  };
  
  const handleSampleNoSuffixChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const suffix = e.target.value;
    const newSampleNo = `${nomorFppsPrefix}${suffix}`;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, sampleNo: newSampleNo },
    });
  };

  const sampleNoSuffix = template.sampleInfo.sampleNo.startsWith(nomorFppsPrefix)
    ? template.sampleInfo.sampleNo.substring(nomorFppsPrefix.length)
    : "";

  const renderField = ({ label, id, value, onChange }: RenderFieldProps) => (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        className="bg-transparent border border-input text-foreground mt-1"
      />
    </div>
  );

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Detail & Hasil Tes Heat Stress (Iklim Kerja)</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Informasi Sampel Umum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
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
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Hasil Pengujian per Lokasi
          </h3>
          <div className="space-y-4 pt-2">
            {template.results.map((row: HeatStressResultRow, index: number) => (
              <div
                key={row.id}
                className="border rounded-lg p-4 space-y-4 bg-muted/20"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-foreground">
                    Lokasi #{index + 1}
                  </p>
                  {template.results.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRow(index)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                  {renderField({
                    label: "Lokasi Sampling",
                    id: `location-${index}`,
                    value: row.location,
                    onChange: (e) =>
                      handleChange(index, "location", e.target.value),
                  })}
                  {renderField({
                    label: "Waktu",
                    id: `time-${index}`,
                    value: row.time,
                    onChange: (e) =>
                      handleChange(index, "time", e.target.value),
                  })}
                  {renderField({
                    label: "Kelembapan (%)",
                    id: `humidity-${index}`,
                    value: row.humidity,
                    onChange: (e) =>
                      handleChange(index, "humidity", e.target.value),
                  })}
                  {renderField({
                    label: "Suhu Basah (°C)",
                    id: `wetTemp-${index}`,
                    value: row.wetTemp,
                    onChange: (e) =>
                      handleChange(index, "wetTemp", e.target.value),
                  })}
                  {renderField({
                    label: "Suhu Kering (°C)",
                    id: `dewTemp-${index}`,
                    value: row.dewTemp,
                    onChange: (e) =>
                      handleChange(index, "dewTemp", e.target.value),
                  })}
                  {renderField({
                    label: "Suhu Globe (°C)",
                    id: `globeTemp-${index}`,
                    value: row.globeTemp,
                    onChange: (e) =>
                      handleChange(index, "globeTemp", e.target.value),
                  })}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleAddRow}
              className="w-full sm:w-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Lokasi
            </Button>
          </div>
        </div>

        {/* --- 2. BAGIAN INI DITAMBAHKAN --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-3 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan Halaman
          </h3>
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
            <div className="space-y-0.5">
              <Label htmlFor="kan-logo-switch" className="text-base">
                Tampilkan Logo KAN
              </Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan untuk menampilkan logo KAN di header halaman ini.
              </p>
            </div>
            <Switch
              id="kan-logo-switch"
              checked={template.showKanLogo}
              onCheckedChange={(value: boolean) =>
                onTemplateChange({ ...template, showKanLogo: value })
              }
            />
          </div>
        </div>
        {/* ----------------------------- */}

      </CardContent>
      <CardFooter className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onPreview}
          className="w-full sm:w-auto"
        >
          <FileSearch className="mr-2 h-4 w-4" />
          Preview Halaman
        </Button>
        <Button onClick={() => onSave(template)} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Simpan Perubahan
        </Button>
      </CardFooter>
    </Card>
  );
}