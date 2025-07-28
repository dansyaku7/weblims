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
  Eye,
  EyeOff,
  Pencil,
  ChevronLeft,
  Save,
  FileSearch,
} from "lucide-react";
import { defaultIlluminationRow } from "../data/illumination-data";

interface IlluminationResultRow {
  id: number;
  location: string;
  result: string | number;
  time: string;
  unit: string;
  standard: string | number;
  method: string;
  isVisible: boolean;
}

interface SampleInfo {
  sampleNo: string;
  samplingLocation: string;
  samplingTime: string;
}

interface IlluminationTemplate {
  sampleInfo: SampleInfo;
  results: IlluminationResultRow[];
}

interface IlluminationFormProps {
  template: IlluminationTemplate;
  onTemplateChange: (template: IlluminationTemplate) => void;
  onSave: (template: IlluminationTemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function IlluminationForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: IlluminationFormProps) {
  const handleChange = (
    index: number,
    field: keyof Omit<IlluminationResultRow, "id">,
    value: string | number | boolean
  ) => {
    const newResults = [...template.results];
    if (index >= 0 && index < newResults.length) {
      newResults[index] = { ...newResults[index], [field]: value };
      onTemplateChange({ ...template, results: newResults });
    }
  };

  const handleAddRow = () => {
    const newRow: IlluminationResultRow = {
      ...defaultIlluminationRow,
      id: Date.now(), // Unique ID
      isVisible: true,
    };
    const newResults = [...template.results, newRow];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveRow = (index: number) => {
    const newResults = template.results.filter((_, i) => i !== index);
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
  };

  const renderInput = (
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    id: string
  ) => (
    <Input
      id={id}
      name={id}
      value={value || ""}
      onChange={onChange}
      className="bg-transparent border border-input text-foreground mt-1"
    />
  );

  const renderLabel = (
    text: string,
    htmlFor: string,
    isEditable: boolean = false
  ) => (
    <Label
      htmlFor={htmlFor}
      className="text-sm font-medium text-foreground flex items-center"
    >
      {text}
      {isEditable && (
        <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
      )}
    </Label>
  );

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Detail & Hasil Tes Illumination</CardTitle>
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
              {renderLabel("Sampel No.", "sampleNo")}
              {renderInput(
                template.sampleInfo.sampleNo,
                handleSampleInfoChange,
                "sampleNo"
              )}
            </div>
            <div>
              {renderLabel("Lokasi Sampling", "samplingLocation")}
              {renderInput(
                template.sampleInfo.samplingLocation,
                handleSampleInfoChange,
                "samplingLocation"
              )}
            </div>
            <div>
              {renderLabel("Waktu Sampling", "samplingTime")}
              {renderInput(
                template.sampleInfo.samplingTime,
                handleSampleInfoChange,
                "samplingTime"
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Hasil Pengujian per Lokasi
          </h3>
          <div className="space-y-4 pt-2">
            {template.results.map(
              (row: IlluminationResultRow, index: number) => (
                <div
                  key={row.id}
                  className="border rounded-lg p-4 space-y-4 bg-muted/20"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-foreground">
                      Lokasi #{index + 1}
                    </p>
                    <div className="flex items-center gap-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleChange(index, "isVisible", !row.isVisible)
                        }
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        {row.isVisible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
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
                  </div>

                  {row.isVisible && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          {renderLabel("Lokasi Sampling", `location-${index}`)}
                          {renderInput(
                            row.location,
                            (e) =>
                              handleChange(index, "location", e.target.value),
                            `location-${index}`
                          )}
                        </div>
                        <div>
                          {renderLabel("Hasil Tes", `result-${index}`)}
                          {renderInput(
                            row.result,
                            (e) =>
                              handleChange(index, "result", e.target.value),
                            `result-${index}`
                          )}
                        </div>
                        <div>
                          {renderLabel("Waktu", `time-${index}`)}
                          {renderInput(
                            row.time,
                            (e) => handleChange(index, "time", e.target.value),
                            `time-${index}`
                          )}
                        </div>
                        <div>
                          {renderLabel("Unit", `unit-${index}`)}
                          {renderInput(
                            row.unit,
                            (e) => handleChange(index, "unit", e.target.value),
                            `unit-${index}`
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          {renderLabel(
                            "Standar Baku Mutu",
                            `standard-${index}`,
                            true
                          )}
                          {renderInput(
                            row.standard,
                            (e) =>
                              handleChange(index, "standard", e.target.value),
                            `standard-${index}`
                          )}
                        </div>
                        <div>
                          {renderLabel("Metode", `method-${index}`, true)}
                          {renderInput(
                            row.method,
                            (e) =>
                              handleChange(index, "method", e.target.value),
                            `method-${index}`
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
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
