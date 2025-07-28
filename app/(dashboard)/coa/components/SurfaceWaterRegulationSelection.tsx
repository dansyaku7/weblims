"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function SurfaceWaterRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    {
      id: "pp_22_2021_river",
      name: "PP No. 22/2021 (Air Sungai)",
      description: "Standar baku mutu untuk sungai dan sejenisnya.",
    },
    {
      id: "pp_22_2021_lake",
      name: "PP No. 22/2021 (Air Danau)",
      description: "Standar baku mutu untuk danau dan sejenisnya.",
    },
    {
      id: "pergub_dki_582",
      name: "Pergub DKI Jakarta No. 582/1995",
      description: "Standar baku mutu untuk badan air di wilayah DKI Jakarta.",
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Surface Water</CardTitle>
          <Button variant="outline" onClick={onBack}>
            Kembali
          </Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada
          sertifikat analisis.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3">
        {regulations.map((reg) => (
          <Button
            key={reg.id}
            variant="outline"
            onClick={() => onSelect(reg.id)}
            className="h-auto w-full justify-between p-4 text-left"
          >
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{reg.name}</p>
              <p className="font-normal text-muted-foreground">
                {reg.description}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
