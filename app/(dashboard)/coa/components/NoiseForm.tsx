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
  PlusCircle,
  Trash2,
  Settings,
  ChevronLeft,
  Save,
  FileSearch,
} from "lucide-react";
import { defaultNoiseSimpleRow } from "../data/noise-data";

interface NoiseMeasurement {
  id: string;
  point: string;
  leq: string | number;
  ls: string | number;
  lm: string | number;
  lsm: string | number;
}

interface NoiseComplexResult {
  id: string;
  locationName: string;
  measurements: NoiseMeasurement[];
}

interface NoiseSimpleResult {
  id: string;
  location: string;
  time: string;
  testingResult: string | number;
  standard: string | number;
  unit: string;
  method: string;
}

type NoiseResult = NoiseSimpleResult | NoiseComplexResult;

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
  samplingMethod: string;
  notes: string;
}

interface NoiseTemplate {
  regulation: "kepmen_lh_48" | "kepgub_dki_551" | string;
  sampleInfo: SampleInfo;
  results: NoiseResult[];
  showKanLogo: boolean;
}

interface NoiseFormProps {
  template: NoiseTemplate;
  onTemplateChange: (template: NoiseTemplate) => void;
  onSave: (template: NoiseTemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function NoiseForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: NoiseFormProps) {
  const handleSampleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
  };

  const handleSimpleRowChange = (
    index: number,
    field: keyof NoiseSimpleResult,
    value: string | number
  ) => {
    const newResults = [...template.results] as NoiseSimpleResult[];
    if (index >= 0 && index < newResults.length) {
      newResults[index] = { ...newResults[index], [field]: value };
      onTemplateChange({ ...template, results: newResults });
    }
  };

  const handleAddSimpleRow = () => {
    const newRow: NoiseSimpleResult = {
      ...defaultNoiseSimpleRow,
      id: `noise-${Date.now()}`,
      standard: (template.results[0] as NoiseSimpleResult)?.standard || "",
      unit: (template.results[0] as NoiseSimpleResult)?.unit || "dBA",
      method: (template.results[0] as NoiseSimpleResult)?.method || "",
    };
    const newResults = [...template.results, newRow];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveSimpleRow = (id: string) => {
    const newResults = template.results.filter(
      (row) => (row as NoiseSimpleResult).id !== id
    );
    onTemplateChange({ ...template, results: newResults });
  };

  const handleComplexChange = (
    locationIndex: number,
    measurementIndex: number,
    field: keyof NoiseMeasurement,
    value: string | number
  ) => {
    const newResults = [...template.results] as NoiseComplexResult[];
    const newMeasurements = [...newResults[locationIndex].measurements];
    newMeasurements[measurementIndex] = {
      ...newMeasurements[measurementIndex],
      [field]: value,
    };
    newResults[locationIndex] = {
      ...newResults[locationIndex],
      measurements: newMeasurements,
    };
    onTemplateChange({ ...template, results: newResults });
  };

  const renderSimpleForm = () => (
    <div className="space-y-4">
      {(template.results as NoiseSimpleResult[]).map((row, index) => (
        <div
          key={row.id}
          className="p-4 rounded-lg border bg-muted/30 space-y-4"
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold">Lokasi #{index + 1}</p>
            {template.results.length > 1 && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveSimpleRow(row.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Lokasi Sampling</Label>
              <Input
                value={row.location}
                onChange={(e) =>
                  handleSimpleRowChange(index, "location", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Waktu</Label>
              <Input
                value={row.time}
                onChange={(e) =>
                  handleSimpleRowChange(index, "time", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Hasil Tes (Leq)</Label>
              <Input
                value={row.testingResult}
                onChange={(e) =>
                  handleSimpleRowChange(index, "testingResult", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Standar</Label>
              <Input
                value={row.standard}
                readOnly
                className="bg-muted/70 cursor-default"
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={handleAddSimpleRow}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Tambah Lokasi
      </Button>
    </div>
  );

  const renderComplexForm = () => (
    <div className="space-y-6">
      {(template.results as NoiseComplexResult[]).map(
        (location, locationIndex) => (
          <div key={location.id} className="p-4 rounded-lg border bg-muted/30">
            <h4 className="text-lg font-semibold mb-4">
              {location.locationName}
            </h4>
            <div className="space-y-2">
              {location.measurements.map((m, measurementIndex) => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg border bg-background/50 grid grid-cols-2 md:grid-cols-5 gap-4 items-end"
                >
                  <div className="font-medium self-center col-span-2 md:col-span-1">
                    {m.point}
                  </div>
                  <div className="space-y-2">
                    <Label>Leq</Label>
                    <Input
                      value={m.leq}
                      onChange={(e) =>
                        handleComplexChange(
                          locationIndex,
                          measurementIndex,
                          "leq",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ls</Label>
                    <Input
                      value={m.ls}
                      onChange={(e) =>
                        handleComplexChange(
                          locationIndex,
                          measurementIndex,
                          "ls",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Lm</Label>
                    <Input
                      value={m.lm}
                      onChange={(e) =>
                        handleComplexChange(
                          locationIndex,
                          measurementIndex,
                          "lm",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Lsm</Label>
                    <Input
                      value={m.lsm}
                      onChange={(e) =>
                        handleComplexChange(
                          locationIndex,
                          measurementIndex,
                          "lsm",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Kebisingan</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Sampel No.</Label>
              <Input
                name="sampleNo"
                value={template.sampleInfo.sampleNo || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Lokasi Sampling</Label>
              <Input
                name="samplingLocation"
                value={template.sampleInfo.samplingLocation || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Waktu Sampling</Label>
              <Input
                name="samplingTime"
                value={template.sampleInfo.samplingTime || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Metode Sampling</Label>
              <Input
                name="samplingMethod"
                value={template.sampleInfo.samplingMethod || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Catatan Kaki</Label>
            <Textarea
              name="notes"
              value={template.sampleInfo.notes || ""}
              onChange={handleSampleInfoChange}
              placeholder="Contoh: ** Peraturan Pemerintah..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Hasil Pengujian
          </h3>
          {["kepmen_lh_48", "kepgub_dki_551"].includes(template.regulation)
            ? renderComplexForm()
            : renderSimpleForm()}
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
              onCheckedChange={(value) =>
                onTemplateChange({ ...template, showKanLogo: value })
              }
            />
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
