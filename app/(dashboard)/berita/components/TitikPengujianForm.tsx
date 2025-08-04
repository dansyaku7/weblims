"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// 1. Ubah tipe 'onChange' agar menerima objek data, bukan event
interface TitikPengujianFormProps {
  data: Record<string, string>;
  onChange: (newData: Record<string, string>) => void;
}

export function TitikPengujianForm({
  data,
  onChange,
}: TitikPengujianFormProps) {

  // 2. Buat fungsi handler internal untuk memproses event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Buat objek data baru dengan nilai yang sudah di-update
    const updatedData = {
      ...data,
      [name]: value,
    };

    // Kirim objek data yang sudah jadi ke halaman induk
    onChange(updatedData);
  };

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
            // 3. Panggil handler internal, bukan prop 'onChange' langsung
            onChange={handleInputChange}
            className="bg-transparent border border-input text-foreground mt-1"
            placeholder="... titik"
          />
        </div>
      ))}
    </div>
  );
}