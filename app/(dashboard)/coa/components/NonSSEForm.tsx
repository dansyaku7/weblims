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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, PlusCircle, Trash2, Save, FileSearch, Settings } from "lucide-react";
import { defaultNonSSERow } from "../data/non-sse-data";
import { Switch } from "@/components/ui/switch";

interface NonSSERow {
  id: string;
  location: string;
  vehicleBrand: string;
  year: string;
  capacity: string;
  fuel: string;
  parameter: string;
  testingResult: string;
  standard: string;
  unit: string;
  method: string;
}

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
  notes: string;
}

interface NonSSETemplate {
  sampleInfo: SampleInfo;
  results: NonSSERow[];
  showKanLogo: boolean;
}

interface NonSSEFormProps {
  template: NonSSETemplate;
  nomorFppsPrefix: string;
  onTemplateChange: (template: NonSSETemplate) => void;
  onSave: (template: NonSSETemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function NonSSEForm({
  template,
  nomorFppsPrefix,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: NonSSEFormProps) {
  const handleRowChange = (
    index: number,
    field: keyof NonSSERow,
    value: any
  ) => {
    const newResults = [...template.results];
    const newRow = { ...newResults[index], [field]: value };

    if (field === "parameter" || field === "year") {
      const year =
        field === "year" ? parseInt(value, 10) : parseInt(newRow.year, 10);
      const parameter = field === "parameter" ? value : newRow.parameter;

      if (parameter === "Opacity") {
        newRow.unit = "%";
        newRow.method = "SNI 09-7118-2005";
        newRow.standard = year < 2010 ? "70" : "40";
      } else if (parameter === "CO") {
        newRow.unit = "% Vol";
        newRow.method = "SNI 19-7117.10-2005";
        newRow.standard = year < 2007 ? "4.5" : "1.5";
      }
    }

    newResults[index] = newRow;
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
    const newResults = [...template.results, { ...defaultNonSSERow }];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveRow = (id: string) => {
    const newResults = template.results.filter((row) => row.id !== id);
    onTemplateChange({ ...template, results: newResults });
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Emisi Sumber Bergerak</CardTitle>
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
            <div className="space-y-2">
              <Label htmlFor="sampleNo">Sampel No. (Umum)</Label>
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
                placeholder="Isi 'See Table' jika berbeda"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="samplingTime">Waktu Sampling (Umum)</Label>
              <Input
                id="samplingTime"
                name="samplingTime"
                value={template.sampleInfo.samplingTime || ""}
                onChange={handleSampleInfoChange}
                placeholder="Isi 'See Table' jika berbeda"
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
              placeholder="Contoh: ** Peraturan Menteri Lingkungan Hidup Republik Indonesia..."
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold border-b pb-3 mb-6">
            Data Kendaraan & Hasil Pengujian
          </h3>
          <div className="space-y-4">
            {template.results.map((row, index) => (
              <div
                key={row.id}
                className="p-4 rounded-lg border bg-muted/30 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Kendaraan #{index + 1}</p>
                  {template.results.length > 1 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveRow(row.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label>Lokasi</Label>
                    <Input
                      value={row.location}
                      onChange={(e) =>
                        handleRowChange(index, "location", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Merek Kendaraan</Label>
                    <Input
                      value={row.vehicleBrand}
                      onChange={(e) =>
                        handleRowChange(index, "vehicleBrand", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tahun Pembuatan</Label>
                    <Input
                      type="number"
                      value={row.year}
                      onChange={(e) =>
                        handleRowChange(index, "year", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kapasitas (CC)</Label>
                    <Input
                      type="number"
                      value={row.capacity}
                      onChange={(e) =>
                        handleRowChange(index, "capacity", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label>Bahan Bakar</Label>
                    <Select
                      value={row.fuel}
                      onValueChange={(value) =>
                        handleRowChange(index, "fuel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bahan bakar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bensin">Bensin</SelectItem>
                        <SelectItem value="Solar">Solar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Parameter</Label>
                    <Select
                      value={row.parameter}
                      onValueChange={(value) =>
                        handleRowChange(index, "parameter", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih parameter..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Opacity">Opacity</SelectItem>
                        <SelectItem value="CO">CO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Hasil Tes</Label>
                    <Input
                      type="number"
                      value={row.testingResult}
                      onChange={(e) =>
                        handleRowChange(index, "testingResult", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Baku Mutu</Label>
                    <Input
                      value={row.standard}
                      onChange={(e) =>
                        handleRowChange(index, "standard", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddRow}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Tambah Kendaraan
            </Button>
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
              onCheckedChange={(value: boolean) =>
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