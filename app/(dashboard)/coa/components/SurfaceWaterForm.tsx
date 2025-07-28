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

interface StandardClass {
  class1: string;
  class2: string;
  class3: string;
  class4: string;
}

interface ParameterResult {
  name: string;
  category?: string;
  testingResult: string;
  unit: string;
  standard: string | StandardClass;
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
  regulation: string;
  results: ParameterResult[];
  sampleInfo: SampleInfo;
  showKanLogo: boolean;
}

interface SurfaceWaterFormProps {
  template: Template;
  onTemplateChange: (template: Template) => void;
  onSave: (template: Template) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function SurfaceWaterForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: SurfaceWaterFormProps) {
  const handleParameterChange = (
    index: number,
    field: keyof ParameterResult,
    value: string | boolean,
    subField?: keyof StandardClass
  ) => {
    const newResults = [...template.results];
    const currentParam = { ...newResults[index] };

    if (
      field === "standard" &&
      subField &&
      typeof currentParam.standard === "object"
    ) {
      const newStandard: StandardClass = {
        ...(currentParam.standard as StandardClass),
        [subField]: String(value),
      };
      currentParam.standard = newStandard;
    } else {
      (currentParam as any)[field] = value;
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

  const isMultiColumn = template.regulation.startsWith("pp_22");

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Surface Water</CardTitle>
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
            Hasil Pengujian Parameter
          </h3>
          <div className="space-y-4">
            {template.results.map((param, index) => (
              <React.Fragment key={`${param.name}-${index}`}>
                {param.category &&
                  (index === 0 ||
                    template.results[index - 1]?.category !==
                      param.category) && (
                    <h4 className="font-bold text-muted-foreground pt-4 pb-2">
                      {param.category}
                    </h4>
                  )}

                <div className="p-4 rounded-lg border bg-muted/30 space-y-4">
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
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {param.isVisible &&
                    (isMultiColumn ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
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
                              handleParameterChange(
                                index,
                                "unit",
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
                              handleParameterChange(
                                index,
                                "method",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 pt-4 border-t">
                          {[1, 2, 3, 4].map((classNum) => (
                            <div className="space-y-2" key={classNum}>
                              <Label>Baku Mutu (Kelas {classNum})</Label>
                              <Input
                                value={
                                  (param.standard as StandardClass)[
                                    `class${classNum}` as keyof StandardClass
                                  ] || ""
                                }
                                onChange={(e) =>
                                  handleParameterChange(
                                    index,
                                    "standard",
                                    e.target.value,
                                    `class${classNum}` as keyof StandardClass
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
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
                              handleParameterChange(
                                index,
                                "unit",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center">
                            Baku Mutu <Pencil className="w-3 h-3 ml-1.5" />
                          </Label>
                          <Input
                            value={param.standard as string}
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
                              handleParameterChange(
                                index,
                                "method",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </React.Fragment>
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
