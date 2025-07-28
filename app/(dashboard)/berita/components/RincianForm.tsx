"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RincianItem {
  id: string;
  lokasi: string;
  parameter: string;
  regulasi: string;
  jenisSampel: string;
  waktuPengambilan: string;
}

interface RincianFormProps {
  rincianUji: RincianItem[];
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RincianForm({ rincianUji, onChange }: RincianFormProps) {
  return (
    <div className="space-y-4">
      {rincianUji.map((item, index) => (
        <div
          key={item.id}
          className="p-4 rounded-lg border border-border space-y-2"
        >
          <p className="font-semibold text-foreground">
            {index + 1}. Lokasi: {item.lokasi}
          </p>
          <p className="text-sm text-muted-foreground">
            Parameter: {item.parameter}
          </p>
          <p className="text-sm text-muted-foreground">
            Regulasi: {item.regulasi}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-sm font-medium text-foreground">
                Jenis Sampel
              </Label>
              <Input
                name="jenisSampel"
                value={item.jenisSampel}
                onChange={(e) => onChange(index, e)}
                className="bg-transparent border border-input text-foreground mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Waktu Pengambilan
              </Label>
              <Input
                name="waktuPengambilan"
                value={item.waktuPengambilan}
                onChange={(e) => onChange(index, e)}
                className="bg-transparent border border-input text-foreground mt-1"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
