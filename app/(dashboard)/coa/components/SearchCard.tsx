// File: app/(dashboard)/coa/components/SearchCard.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";

// 1. Tambahkan userRole ke dalam interface props
interface SearchCardProps {
  fppsInput: string;
  setFppsInput: (value: string) => void;
  handleCariFpps: () => void;
  isLoading: boolean;
  userRole?: string;
}

export function SearchCard({
  fppsInput,
  setFppsInput,
  handleCariFpps,
  isLoading,
  userRole, // <-- 2. Terima props userRole
}: SearchCardProps) {

  // 3. Cek apakah role adalah analis
  const isAnalyst = userRole?.toLowerCase() === "analis";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoading && !isAnalyst) { // Tambahkan cek !isAnalyst
      handleCariFpps();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.startsWith("DIL-") ? value.slice(4) : value;
    if (/^\d*$/.test(onlyNumber)) {
      setFppsInput(onlyNumber);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Cari Data FPPS</CardTitle>
        <CardDescription>
          Masukkan nomor FPPS untuk mengambil data customer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex-grow">
              <Label
                htmlFor="search-fpps"
                className="text-sm font-medium text-foreground"
              >
                Nomor FPPS
              </Label>
              <Input
                id="search-fpps"
                type="text"
                placeholder="Ketik nomornya saja..."
                value={`DIL-${fppsInput}`}
                onChange={handleChange}
                className="bg-transparent border border-input text-foreground mt-1 w-full"
                // 4. Nonaktifkan jika loading ATAU jika dia analis
                disabled={isLoading || isAnalyst}
              />
            </div>

            <Button
              type="submit"
              // 5. Nonaktifkan jika loading, ATAU jika input kosong, ATAU jika dia analis
              disabled={isLoading || !fppsInput || isAnalyst}
              className="flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isLoading ? "Mencari..." : "Cari"}
            </Button>
          </div>
          {isAnalyst && (
            <p className="text-sm text-yellow-600 mt-4">
              Fitur pencarian FPPS tidak tersedia untuk role Analis.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}