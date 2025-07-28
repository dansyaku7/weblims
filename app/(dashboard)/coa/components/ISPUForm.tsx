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
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Eye, EyeOff, Save, FileSearch, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface IspuBoundary {
  Ib: number;
  Ia: number;
  Xb: number;
  Xa: number;
}

type PollutantKey = "PM10" | "PM2.5";

interface ISPUResult {
  name: string;
  unit: string;
  testingResult: string | number;
  ispuCalculationResult: string | number;
  ispuCategory: string;
  isVisible: boolean;
}

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
  notes: string;
}

interface ISPUTemplate {
  sampleInfo: SampleInfo;
  results: ISPUResult[];
}

// 1. TAMBAHKAN PROPS BARU
interface ISPUFormProps {
  template: ISPUTemplate;
  nomorFppsPrefix: string; // <-- Props baru
  onTemplateChange: (template: ISPUTemplate) => void;
  onSave: (template: ISPUTemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

const ispuBoundaries: Record<PollutantKey, IspuBoundary[]> = {
  PM10: [
    { Ib: 0, Ia: 50, Xb: 0, Xa: 50 },
    { Ib: 51, Ia: 100, Xb: 51, Xa: 150 },
    { Ib: 101, Ia: 200, Xb: 151, Xa: 350 },
    { Ib: 201, Ia: 300, Xb: 351, Xa: 420 },
    { Ib: 301, Ia: 500, Xb: 421, Xa: 500 },
  ],
  "PM2.5": [
    { Ib: 0, Ia: 50, Xb: 0, Xa: 15.5 },
    { Ib: 51, Ia: 100, Xb: 15.6, Xa: 55.4 },
    { Ib: 101, Ia: 200, Xb: 55.5, Xa: 150.4 },
    { Ib: 201, Ia: 300, Xb: 150.5, Xa: 250.4 },
    { Ib: 301, Ia: 500, Xb: 250.5, Xa: 500 },
  ],
};

const getCategory = (ispu: number): string => {
  if (ispu >= 0 && ispu <= 50) return "Baik";
  if (ispu >= 51 && ispu <= 100) return "Sedang";
  if (ispu >= 101 && ispu <= 200) return "Tidak Sehat";
  if (ispu >= 201 && ispu <= 300) return "Sangat Tidak Sehat";
  if (ispu >= 301) return "Berbahaya";
  return "";
};

const getCategoryBadgeClass = (category: string): string => {
  switch (category) {
    case "Baik":
      return "bg-green-500 hover:bg-green-500/80";
    case "Sedang":
      return "bg-blue-500 hover:bg-blue-500/80";
    case "Tidak Sehat":
      return "bg-yellow-500 hover:bg-yellow-500/80 text-black";
    case "Sangat Tidak Sehat":
      return "bg-red-600 hover:bg-red-600/80";
    case "Berbahaya":
      return "bg-black hover:bg-black/80 text-white";
    default:
      return "bg-gray-400";
  }
};

export function ISPUForm({
  template,
  nomorFppsPrefix, // <-- 2. Terima props baru
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: ISPUFormProps) {
  const calculateISPU = (
    pollutantName: string,
    concentrationStr: string | number
  ): { ispu: string | number; category: string } => {
    const concentration = parseFloat(String(concentrationStr));
    if (isNaN(concentration)) {
      return { ispu: "", category: "" };
    }

    const key: PollutantKey | undefined = pollutantName.includes("PM10")
      ? "PM10"
      : pollutantName.includes("PM2.5")
      ? "PM2.5"
      : undefined;

    if (!key) return { ispu: "", category: "" };

    const boundaries = ispuBoundaries[key];
    const boundary = boundaries.find(
      (b) => concentration >= b.Xb && concentration <= b.Xa
    );

    if (!boundary) {
      if (concentration > boundaries[boundaries.length - 1].Xa) {
        return { ispu: ">500", category: "Berbahaya" };
      }
      return { ispu: "", category: "" };
    }

    const { Ia, Ib, Xa, Xb } = boundary;
    const ispuValue = ((Ia - Ib) / (Xa - Xb)) * (concentration - Xb) + Ib;
    const roundedIspu = Math.round(ispuValue);

    return {
      ispu: roundedIspu,
      category: getCategory(roundedIspu),
    };
  };

  const handleParameterChange = (
    index: number,
    field: keyof ISPUResult,
    value: string | number | boolean
  ) => {
    const newResults = [...template.results];
    const currentParam = { ...newResults[index] };

    (currentParam as any)[field] = value;

    if (field === "testingResult" || field === "name") {
      const nameToCalc = field === "name" ? (value as string) : currentParam.name;
      const resultToCalc = field === "testingResult" ? (value as string | number) : currentParam.testingResult;
      const { ispu, category } = calculateISPU(nameToCalc, resultToCalc);
      currentParam.ispuCalculationResult = ispu;
      currentParam.ispuCategory = category;
    }

    newResults[index] = currentParam;
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

  // 3. LOGIKA BARU UNTUK SAMPEL NO
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
  // ------------------------------

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Perhitungan ISPU</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Informasi Sampel & Catatan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* --- 4. INPUT SAMPEL NO DIUBAH --- */}
            <div className="space-y-2">
              <Label htmlFor="sampleNo">Sampel No.</Label>
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

            <div className="space-y-2">
              <Label htmlFor="samplingLocation">Lokasi Sampling</Label>
              <Input
                id="samplingLocation"
                name="samplingLocation"
                value={template.sampleInfo.samplingLocation || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="samplingTime">Waktu Sampling</Label>
              <Input
                id="samplingTime"
                name="samplingTime"
                value={template.sampleInfo.samplingTime || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan Kaki</Label>
            <Textarea
              id="notes"
              name="notes"
              value={template.sampleInfo.notes || ""}
              onChange={handleSampleInfoChange}
              placeholder="Contoh: *** Peraturan Menteri Lingkungan Hidup dan Kehutanan..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Hasil Pengujian & Perhitungan
          </h3>
          <div className="space-y-4">
            {template.results.map((param: ISPUResult, index: number) => (
              <div
                key={`${param.name}-${index}`}
                className="p-4 rounded-lg border bg-muted/30 space-y-4"
              >
                <div className="flex justify-between items-center">
                  
                  {/* --- 5. JUDUL PARAMETER DIUBAH --- */}
                  <div className="flex-grow">
                    <Label
                      htmlFor={`param-name-${index}`}
                      className="text-sm font-medium text-foreground flex items-center mb-1"
                    >
                      Parameter
                      <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
                    </Label>
                    <Input
                      id={`param-name-${index}`}
                      value={param.name}
                      onChange={(e) =>
                        handleParameterChange(index, "name", e.target.value)
                      }
                      className="bg-transparent border border-input text-foreground font-semibold"
                      placeholder="Nama Parameter (e.g., PM10)"
                    />
                  </div>
                  {/* ----------------------------- */}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleParameterChange(
                        index,
                        "isVisible",
                        !param.isVisible
                      )
                    }
                    className="text-muted-foreground hover:text-foreground h-8 w-8 ml-4 self-end mb-1"
                  >
                    {param.isVisible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {param.isVisible && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                      <Label>Hasil Uji ({param.unit})</Label>
                      <Input
                        type="number"
                        value={param.testingResult || ""}
                        onChange={(e) =>
                          handleParameterChange(
                            index,
                            "testingResult",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hasil Hitung ISPU</Label>
                      <Input
                        value={param.ispuCalculationResult}
                        readOnly
                        className="bg-muted/70 cursor-default"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Kategori ISPU</Label>
                      {param.ispuCategory ? (
                        <Badge
                          className={cn(
                            "text-base w-full flex justify-center py-2",
                            getCategoryBadgeClass(param.ispuCategory)
                          )}
                        >
                          {param.ispuCategory}
                        </Badge>
                      ) : (
                        <Input
                          value=""
                          readOnly
                          className="bg-muted/70 cursor-default"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onPreview}>
          <FileSearch className="mr-2 h-4 w-4" />
          Preview Halaman
        </Button>
        <Button onClick={() => onSave(template)}>
          <Save className="mr-2 h-4 w-4" />
          Simpan Perubahan
        </Button>
      </CardFooter>
    </Card>
  );
}