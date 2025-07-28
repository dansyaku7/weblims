"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TitikPengujianFormProps {
  data: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TitikPengujianForm({
  data,
  onChange,
}: TitikPengujianFormProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.keys(data).map((key) => (
        <div key={key} className="flex flex-col">
          <Label className="text-sm font-medium text-foreground capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </Label>
          <Input
            name={key}
            value={data[key]}
            onChange={onChange}
            className="bg-transparent border border-input text-foreground mt-1"
            placeholder="... titik"
          />
        </div>
      ))}
    </div>
  );
}
