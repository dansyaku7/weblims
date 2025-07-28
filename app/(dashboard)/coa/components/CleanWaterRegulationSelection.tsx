"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ShowerHead } from "lucide-react"; // 1. Impor ikon

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function CleanWaterRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    {
      id: "permenkes_32_2017",
      name: "Permenkes No. 32 Tahun 2017",
      description: "Standar Kualitas Air untuk Keperluan Higiene Sanitasi.",
    },
    {
      id: "permenkes_2_2023",
      name: "Permenkes No. 2 Tahun 2023",
      description: "Standar Baku Mutu Kesehatan Lingkungan untuk Media Air.",
    },
  ];

  return (
    // 2. Class hardcode dihapus, menggunakan style default dari Card
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Pilih Standar Baku Mutu Air Bersih</CardTitle>
          {/* 3. Tombol kembali diberi ikon agar lebih jelas */}
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
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 4. Mengubah tombol biasa menjadi kartu yang lebih interaktif */}
        {regulations.map((reg) => (
          <div
            key={reg.id}
            onClick={() => onSelect(reg.id)}
            className="group flex cursor-pointer flex-col rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted/50"
          >
            <div className="flex items-start gap-3 mb-1">
              <ShowerHead className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              <h4 className="font-semibold text-foreground">{reg.name}</h4>
            </div>
            <p className="text-xs text-muted-foreground pl-9">
              {reg.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
