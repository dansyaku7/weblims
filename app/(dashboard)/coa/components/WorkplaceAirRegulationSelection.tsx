"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Wind } from "lucide-react";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function WorkplaceAirRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    {
      id: "permenaker_a",
      name: "Permenaker No. 05/2018 (Set A)",
      description: "Standar umum lingkungan kerja industri.",
    },
    {
      id: "permenaker_b",
      name: "Permenaker No. 05/2018 (Set B)",
      description: "Termasuk Temperatur & Kelembaban dalam parameter.",
    },
    {
      id: "menkes_1405",
      name: "Kepmenkes No. 1405/2002",
      description: "Standar untuk lingkungan kerja perkantoran dan industri.",
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Pilih Standar Baku Mutu Udara Lingkungan Kerja</CardTitle>
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
      <CardContent className="grid grid-cols-1 gap-4">
        {regulations.map((reg) => (
          <div
            key={reg.id}
            onClick={() => onSelect(reg.id)}
            className="group flex cursor-pointer flex-col rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted/50"
          >
            <div className="flex items-start gap-3 mb-1">
              <Wind className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
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
