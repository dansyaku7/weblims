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
import { Pencil, Eye, EyeOff, Settings, ChevronLeft } from "lucide-react";

interface ParameterResult {
  name: string;
  testingResult: string | number;
  unit: string;
  standard: string | number;
  method: string;
  isVisible: boolean;
}

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
  samplingMethod: string;
  notes: string;
  coordinate: string;
  temperature: string;
  pressure: string;
  humidity: string;
  windSpeed: string;
  windDirection: string;
  weather: string;
}

interface AirAmbientTemplate {
  sampleInfo: SampleInfo;
  results: ParameterResult[];
  showKanLogo: boolean;
}

interface AirAmbientFormProps {
  template: AirAmbientTemplate;
  onTemplateChange: (template: AirAmbientTemplate) => void;
  onSave: (template: AirAmbientTemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function AirAmbientForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: AirAmbientFormProps) {
  const handleParameterChange = (
    index: number,
    field: keyof ParameterResult,
    value: any
  ) => {
    const newResults = [...template.results];
    // Pastikan kita tidak mencoba mengubah properti yang tidak ada
    if (index >= 0 && index < newResults.length) {
      newResults[index] = { ...newResults[index], [field]: value };
      onTemplateChange({ ...template, results: newResults });
    }
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

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Udara Ambien</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sampleNo">Sampel No.</Label>
              <Input
                id="sampleNo"
                name="sampleNo"
                value={template.sampleInfo.sampleNo || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
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
                placeholder="Contoh: 10:30 WIB"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="samplingMethod">Metode Sampling</Label>
              <Input
                id="samplingMethod"
                name="samplingMethod"
                value={template.sampleInfo.samplingMethod || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan Kaki (Regulatory Standard)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={template.sampleInfo.notes || ""}
              onChange={handleSampleInfoChange}
              placeholder="Contoh: ** Peraturan Pemerintah Republik Indonesia..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Kondisi Lingkungan Ambien
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            <div className="space-y-2">
              <Label htmlFor="coordinate">Koordinat</Label>
              <Input
                id="coordinate"
                name="coordinate"
                value={template.sampleInfo.coordinate || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Suhu</Label>
              <Input
                id="temperature"
                name="temperature"
                value={template.sampleInfo.temperature || ""}
                onChange={handleSampleInfoChange}
                placeholder="... °C"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pressure">Tekanan</Label>
              <Input
                id="pressure"
                name="pressure"
                value={template.sampleInfo.pressure || ""}
                onChange={handleSampleInfoChange}
                placeholder="... mmHg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity">Kelembapan</Label>
              <Input
                id="humidity"
                name="humidity"
                value={template.sampleInfo.humidity || ""}
                onChange={handleSampleInfoChange}
                placeholder="... %RH"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="windSpeed">Kecepatan Angin</Label>
              <Input
                id="windSpeed"
                name="windSpeed"
                value={template.sampleInfo.windSpeed || ""}
                onChange={handleSampleInfoChange}
                placeholder="... m/s"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="windDirection">Arah Angin</Label>
              <Input
                id="windDirection"
                name="windDirection"
                value={template.sampleInfo.windDirection || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weather">Cuaca</Label>
              <Input
                id="weather"
                name="weather"
                value={template.sampleInfo.weather || ""}
                onChange={handleSampleInfoChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">
            Hasil Pengujian Parameter
          </h3>
          <div className="space-y-4">
            {template.results.map((param: ParameterResult, index: number) => (
              <div
                key={`${param.name}-${index}`}
                className="p-4 rounded-lg border bg-muted/30 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{param.name}</p>
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
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                  >
                    {param.isVisible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {param.isVisible && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                    <div className="space-y-2">
                      <Label>Hasil Uji</Label>
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
                      <Label className="flex items-center">
                        Unit <Pencil className="w-3 h-3 ml-1.5" />
                      </Label>
                      <Input
                        value={param.unit}
                        onChange={(e) =>
                          handleParameterChange(index, "unit", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        Baku Mutu <Pencil className="w-3 h-3 ml-1.5" />
                      </Label>
                      <Input
                        value={param.standard}
                        onChange={(e) =>
                          handleParameterChange(
                            index,
                            "standard",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        Metode <Pencil className="w-3 h-3 ml-1.5" />
                      </Label>
                      <Input
                        value={param.method}
                        onChange={(e) =>
                          handleParameterChange(index, "method", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
          Preview Halaman
        </Button>
        <Button onClick={() => onSave(template)}>Simpan Perubahan</Button>
      </CardFooter>
    </Card>
  );
}
