// app/dashboard/coa/components/OdorRegulationSelection.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, BookCheck } from "lucide-react";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function OdorRegulationSelection({ onSelect, onBack }: Props) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Langkah 3 a: Pilih Standar Baku Mutu Odor</CardTitle>
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
        <div
          onClick={() => onSelect("permenaker_a")}
          className="group flex cursor-pointer flex-col rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted/50"
        >
          <div className="flex items-start gap-3 mb-1">
            <BookCheck className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <h4 className="font-semibold text-foreground">
              Permenaker No. 05 Thn 2018 (Set A)
            </h4>
          </div>
          <p className="text-xs text-muted-foreground pl-9">
            Ethyl Acetate, Benzene, Toluene, Xylene.
          </p>
        </div>

        <div
          onClick={() => onSelect("permenaker_b")}
          className="group flex cursor-pointer flex-col rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted/50"
        >
          <div className="flex items-start gap-3 mb-1">
            <BookCheck className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <h4 className="font-semibold text-foreground">
              Permenaker No. 05 Thn 2018 (Set B)
            </h4>
          </div>
          <p className="text-xs text-muted-foreground pl-9">
            Methyl Ethyl Ketone, Aceton, Toluene.
          </p>
        </div>

        <div
          onClick={() => onSelect("kepmenlh")}
          className="group flex cursor-pointer flex-col rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-muted/50 md:col-span-2"
        >
          <div className="flex items-start gap-3 mb-1">
            <BookCheck className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <h4 className="font-semibold text-foreground">
              Kepmen LH No. 50 Thn 1996
            </h4>
          </div>
          <p className="text-xs text-muted-foreground pl-9">
            Ammonia, Methyl Mercaptan, H2S, Methyl Sulfide, Styrene.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
