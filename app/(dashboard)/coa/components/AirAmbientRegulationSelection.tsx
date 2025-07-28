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

export function AirAmbientRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    {
      id: "pp_22_2021",
      name: "PP No. 22/2021",
      description: "Standar Nasional Baku Mutu Udara Ambien.",
    },
    {
      id: "pp_22_2021_plus_odor",
      name: "PP No. 22/2021 + Odor",
      description:
        "Standar Nasional ditambah parameter Odor (Kep-50/MENLH/1996).",
    },
    {
      id: "pp_41_1999",
      name: "PP No. 41/1999",
      description: "Standar Pengendalian Pencemaran Udara.",
    },
    {
      id: "kepgub_dki_551",
      name: "Kepgub DKI Jakarta No. 551/2001",
      description: "Standar Baku Mutu Udara Ambien di DKI Jakarta.",
    },
    {
      id: "kepgub_dki_551_plus_odor",
      name: "Kepgub DKI Jakarta No. 551/2001 + Odor",
      description: "Standar DKI ditambah parameter Odor.",
    },
    {
      id: "pergub_jabar_82",
      name: "Pergub Jabar No. 660.31/SK/624/BKPMD/82",
      description: "Standar Baku Mutu Udara Ambien di Jawa Barat.",
    },
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Udara Ambien</CardTitle>
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada
          sertifikat analisis.
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
            {/* -- FIX DI SINI -- */}
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
