"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function NoiseRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    {
      id: "kepmen_lh_48",
      name: "Kepmen LH No. 48/1996",
      description:
        "Standar baku mutu tingkat kebisingan untuk kawasan industri, perdagangan, dll.",
    },
    {
      id: "kepgub_dki_551",
      name: "Kepgub DKI No. 551/2001",
      description:
        "Standar baku mutu tingkat kebisingan di Provinsi DKI Jakarta.",
    },
    {
      id: "permenaker_5",
      name: "Permenaker No. 05/2018",
      description: "Nilai Ambang Batas (NAB) kebisingan di tempat kerja.",
    },
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Kebisingan</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada
          sertifikat analisis kebisingan.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regulations.map((reg) => (
          <Button
            key={reg.id}
            variant="outline"
            onClick={() => onSelect(reg.id)}
            className="h-auto w-full justify-between p-4 text-left"
          >
            <div className="space-y-1 min-w-0">
              <p className="font-semibold text-foreground whitespace-normal">
                {reg.name}
              </p>
              <p className="text-sm font-normal text-muted-foreground whitespace-normal">
                {reg.description}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground ml-4 shrink-0" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
