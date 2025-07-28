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
import { Switch } from "@/components/ui/switch";
import {
  PlusCircle,
  Trash2,
  Settings,
  ChevronLeft,
  FileSearch,
  Save,
} from "lucide-react";
import { nanoid } from "nanoid";
import {
  vibrationParamsPermenaker5,
  vibrationParamsKepmenlh49_Kejut,
  vibrationParamsKepmenlh49_Class3,
} from "../data/vibration-data";

interface ParameterResult {
  id: string;
  location: string;
  time: string;
  testingResult: string;
  unit: string;
  frequency?: string;
  method?: string;
}

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
}

interface Template {
  regulation: string;
  results: ParameterResult[];
  sampleInfo: SampleInfo;
  showKanLogo: boolean;
}

interface VibrationFormProps {
  template: Template;
  nomorFppsPrefix: string;
  onTemplateChange: (template: Template) => void;
  onSave: (template: Template) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function VibrationForm({
  template,
  nomorFppsPrefix,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: VibrationFormProps) {
  const handleParameterChange = (
    index: number,
    field: keyof ParameterResult,
    value: string
  ) => {
    const newResults = [...template.results];
    (newResults[index] as any)[field] = value;
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
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

  const handleAddRow = () => {
    let newRow;
    if (template.regulation === "permenaker_5") {
      newRow = { ...vibrationParamsPermenaker5[0], id: nanoid() };
    } else if (template.regulation === "kepmenlh_49_kejut") {
      newRow = { ...vibrationParamsKepmenlh49_Kejut[0], id: nanoid() };
    } else if (template.regulation === "kepmenlh_49_class3") {
      newRow = { ...vibrationParamsKepmenlh49_Class3[0], id: nanoid() };
    }

    if (newRow) {
      const newResults = [...template.results, newRow];
      onTemplateChange({ ...template, results: newResults });
    }
  };

  const handleRemoveRow = (indexToRemove: number) => {
    const newResults = template.results.filter(
      (_, index) => index !== indexToRemove
    );
    onTemplateChange({ ...template, results: newResults });
  };

  const renderDynamicRows = () => {
    const canAddRows = [
      "permenaker_5",
      "kepmenlh_49_kejut",
      "kepmenlh_49_class3",
    ].includes(template.regulation);

    return (
      <div className="space-y-4">
        {template.results.map((row, index) => (
          <div
            key={row.id || index}
            className="p-4 rounded-lg border bg-muted/30 space-y-4"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">Pengukuran #{index + 1}</p>
              {template.results.length > 1 && canAddRows && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveRow(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label>Lokasi Sampling</Label>
                <Input
                  value={row.location || ""}
                  onChange={(e) =>
                    handleParameterChange(index, "location", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Waktu</Label>
                <Input
                  value={row.time || ""}
                  onChange={(e) =>
                    handleParameterChange(index, "time", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Hasil Uji</Label>
                <Input
                  value={row.testingResult || ""}
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
                <Label>Unit</Label>
                <Input
                  value={row.unit}
                  readOnly
                  className="bg-muted/70 cursor-default"
                />
              </div>
            </div>
          </div>
        ))}
        {canAddRows && (
          <Button variant="outline" onClick={handleAddRow}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Baris Pengukuran
          </Button>
        )}
      </div>
    );
  };

  const renderFixedParamsList = () => {
    return (
      <div className="space-y-4">
        {template.results.map((param, index) => (
          <div
            key={param.frequency || index}
            className="p-4 rounded-lg border bg-muted/30"
          >
            <p className="font-semibold mb-4">
              Frekuensi: {param.frequency}{" "}
              {param.unit.includes("Hz") ? "" : "Hz"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input
                  value={param.location || ""}
                  onChange={(e) =>
                    handleParameterChange(index, "location", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Waktu</Label>
                <Input
                  value={param.time || ""}
                  onChange={(e) =>
                    handleParameterChange(index, "time", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Hasil Tes (mm/s)</Label>
                <Input
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
                <Label>Metode</Label>
                <Input
                  value={param.method}
                  readOnly
                  className="bg-muted/70 cursor-default"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFormContent = () => {
    switch (template.regulation) {
      case "permenaker_5":
      case "kepmenlh_49_kejut":
      case "kepmenlh_49_class3":
        return renderDynamicRows();
      case "kepmenlh_49_class2":
        return renderFixedParamsList();
      default:
        return (
          <p className="text-muted-foreground">
            Form untuk regulasi ini belum memiliki input detail parameter.
          </p>
        );
    }
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Vibration</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Informasi Sampel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="space-y-2">
              <Label htmlFor="samplingLocation">Lokasi Sampling (Umum)</Label>
              <Input
                id="samplingLocation"
                name="samplingLocation"
                value={template.sampleInfo.samplingLocation || ""}
                onChange={handleSampleInfoChange}
                placeholder="(Lihat Tabel)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="samplingTime">Waktu Sampling (Umum)</Label>
              <Input
                id="samplingTime"
                name="samplingTime"
                value={template.sampleInfo.samplingTime || ""}
                onChange={handleSampleInfoChange}
                placeholder="(Lihat Tabel)"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Hasil Pengujian
          </h3>
          {renderFormContent()}
        </div>

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