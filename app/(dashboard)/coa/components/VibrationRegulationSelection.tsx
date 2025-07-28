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

export function VibrationRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    {
      id: "permenaker_5",
      name: "Permenaker No. 05/2018",
      description: "Getaran Seluruh Tubuh (Whole Body Vibration).",
    },
    {
      id: "kepmenlh_49_kejut",
      name: "KepmenLH No. 49/1996 (Getaran Kejut)",
      description: "Baku Tingkat Getaran untuk Kenyamanan dan Kesehatan.",
    },
    {
      id: "kepmenlh_49_class3",
      name: "KepmenLH No. 49/1996 (Kelas III)",
      description: "Baku Tingkat Getaran untuk Kerusakan Bangunan.",
    },
    {
      id: "kepmenlh_49_class2",
      name: "KepmenLH No. 49/1996 (Kelas II)",
      description: "Baku Tingkat Getaran untuk Kerusakan Bangunan (Detail).",
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Getaran</CardTitle>
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
