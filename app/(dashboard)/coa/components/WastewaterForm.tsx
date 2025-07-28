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

// Interface tetap sama, karena 'name' sudah ada
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

interface WastewaterFormProps {
  template: Template;
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
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: WastewaterFormProps) {
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

  const renderField = ({
    label,
    id,
    value,
    onChange,
    placeholder = "",
    isEditable = false,
    type = "input",
  }: RenderFieldProps) => {
    const Component = type === "textarea" ? Textarea : Input;
    return (
      <div>
        <Label
          htmlFor={id}
          className="text-sm font-medium text-foreground flex items-center"
        >
          {label}
          {isEditable && (
            <Pencil className="w-3 h-3 ml-1.5 text-muted-foreground" />
          )}
        </Label>
        <Component
          id={id}
          name={id}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent border border-input text-foreground mt-1"
          rows={type === "textarea" ? 3 : undefined}
        />
      </div>
    );
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
            {renderField({
              label: "Sampel No.",
              id: "sampleNo",
              value: template.sampleInfo.sampleNo,
              onChange: handleSampleInfoChange,
            })}
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3">
            Hasil Pengujian Parameter
          </h3>
          <div className="space-y-2 pt-2">
            {template.results.map((param: ParameterResult, index: number) => {
              const isVisible = param.isVisible !== false;

              return (
                <React.Fragment key={`${param.name}-${index}`}>
                  {param.category && (
                    <h4 className="font-semibold text-foreground pt-4 pb-2">
                      {param.category}
                    </h4>
                  )}
                  <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
                    <div className="flex justify-between items-center">
                      
                      {/* --- BAGIAN INI YANG DIUBAH --- */}
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
                          placeholder="Nama Parameter"
                        />
                      </div>
                      {/* ----------------------------- */}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleParameterChange(index, "isVisible", !isVisible)
                        }
                        className="h-8 w-8 text-muted-foreground hover:text-foreground ml-4 self-end mb-1"
                      >
                        {isVisible ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {isVisible && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {renderField({
                          label: "Hasil Tes",
                          id: `testingResult-${index}`,
                          value: param.testingResult,
                          onChange: (e) =>
                            handleParameterChange(
                              index,
                              "testingResult",
                              e.target.value
                            ),
                        })}
                        {renderField({
                          label: "Unit",
                          id: `unit-${index}`,
                          value: param.unit,
                          onChange: (e) =>
                            handleParameterChange(
                              index,
                              "unit",
                              e.target.value
                            ),
                          isEditable: true,
                        })}
                        {renderField({
                          label: "Standar Baku Mutu",
                          id: `standard-${index}`,
                          value: param.standard,
                          onChange: (e) =>
                            handleParameterChange(
                              index,
                              "standard",
                              e.target.value
                            ),
                          isEditable: true,
                        })}
                        {renderField({
                          label: "Metode",
                          id: `method-${index}`,
                          value: param.method,
                          onChange: (e) =>
                            handleParameterChange(
                              index,
                              "method",
                              e.target.value
                            ),
                          isEditable: true,
                        })}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-3 flex items-center">
            <Settings className="w-5 h-5 mr-3" />
            Pengaturan Halaman
          </h3>
          <div className="flex items-center justify-between rounded-lg border bg-card p-4 mt-2">
            <div>
              <Label
                htmlFor="kan-logo-switch"
                className="text-sm font-medium text-foreground"
              >
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