"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Droplets } from "lucide-react";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function WastewaterRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    { id: "menlhk_p68", name: "PermenLHK P.68/2016 (Limbah Domestik)" },
    { id: "jababeka", name: "Kawasan Industri Jababeka" },
    { id: "surya_cipta", name: "Kawasan Industri Surya Cipta" },
    { id: "mm2100", name: "Kawasan Industri MM2100" },
    { id: "mm2100_cat_c", name: "Kawasan Industri MM2100 (Kat. C)" },
    { id: "lippo_cikarang", name: "Kawasan Industri Lippo Cikarang" },
    { id: "kiic", name: "Karawang International Industrial City (KIIC)" },
    { id: "permenlh_5_2014_xxix", name: "PermenLH 5/2014 (Lamp. XXIX)" },
    // ✨ Pilihan ini dipisah menjadi dua untuk Kelas I dan Kelas II ✨
    {
      id: "permenlh_5_2014_xlvii_1",
      name: "PermenLH 5/2014 (Lamp. XLVII - Kelas I)",
    },
    {
      id: "permenlh_5_2014_xlvii_2",
      name: "PermenLH 5/2014 (Lamp. XLVII - Kelas II)",
    },
    { id: "pergub_dki_69_2013", name: "Pergub DKI Jakarta 69/2013" },
    { id: "bekasi_fajar", name: "Kawasan Industri Bekasi Fajar (MM2100)" },
    { id: "giic", name: "Greenland International Industrial Center (GIIC)" },
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Pilih Standar Baku Mutu Air Limbah</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
        <CardDescription className="pt-1">
          Pilih standar peraturan yang akan digunakan sebagai acuan pada
          sertifikat analisis.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regulations.map((reg) => (
          <div
            key={reg.id}
            onClick={() => onSelect(reg.id)}
            className="group flex cursor-pointer flex-row items-center gap-4 rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted/50"
          >
            <Droplets className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <p className="font-medium text-foreground">{reg.name}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
