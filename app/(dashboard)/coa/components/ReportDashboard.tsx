"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  PlusCircle,
  Save,
  Printer,
  FileText,
  Pencil,
  Trash2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

// Tipe data untuk nama template agar lebih mudah dibaca
const getTemplateDisplayName = (template: any) => {
  // ... (fungsi ini tidak berubah)
  switch (template.templateType) {
    case "odor":
      if (template.regulation === "permenaker_a")
        return "Odor - Permenaker (Set A)";
      if (template.regulation === "permenaker_b")
        return "Odor - Permenaker (Set B)";
      if (template.regulation === "kepmenlh") return "Odor - Kepmen LH 1996";
      return "Odor";
    case "illumination":
      return "Illumination";
    case "heatstress":
      return "Heat Stress (Iklim Kerja)";
    case "wastewater":
      return "Wastewater";
    case "cleanwater":
      return "Clean Water";
    case "workplaceair":
      return "Workplace Air";
    case "surfacewater":
      return "Surface Water";
    case "vibration":
      return "Vibration";
    case "airambient":
      return "Air Ambient";
    case "ssse":
      return "Stationary Source Emission";
    case "ispu":
      return "ISPU (Indeks Standar Pencemar Udara)";
    case "nonsse":
      return "Non-Stationary Source Emission";
    case "noise":
      return "Noise";
    default:
      return "Template Tidak Dikenal";
  }
};

// --> PERUBAHAN 1: Tambahkan 'userRole' ke interface Props
interface Props {
  templates: any[];
  onAddNew: () => void;
  onEdit: (templateId: string) => void;
  onRemove: (templateId: string) => void;
  onSave: () => void;
  onPrint: () => void;
  onBackToCover: () => void;
  isSaving: boolean;
  userRole?: string; // Prop baru untuk role pengguna
}

export function ReportDashboard({
  templates,
  onAddNew,
  onEdit,
  onRemove,
  onSave,
  onPrint,
  onBackToCover,
  isSaving,
  userRole, // --> PERUBAHAN 2: Terima prop userRole di sini
}: Props) {
  
  // --> PERUBAHAN 3: Buat variabel untuk mengecek role
  const isAnalyst = userRole?.toLowerCase() === "analis";

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Dashboard Laporan</CardTitle>
            <CardDescription className="mt-1">
              Tambahkan, edit, atau hapus template untuk laporan ini.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            
            {/* --> PERUBAHAN 4: Tambahkan properti 'disabled' pada tombol ini */}
            <Button
              variant="outline"
              onClick={onBackToCover}
              disabled={isAnalyst}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Cover
            </Button>

            <Button variant="outline" onClick={onSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button onClick={onPrint}>
              <Printer className="w-4 h-4 mr-2" /> Cetak Semua
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* ... (Sisa kode CardContent tidak perlu diubah) ... */}
        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-foreground">
              Template Ditambahkan
            </h3>
          </div>
          {templates.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4" />
              <p className="font-semibold">Belum ada template</p>
              <p className="text-sm mt-1">
                Klik tombol "Tambah Template Baru" untuk memulai.
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {templates.map((template, index) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 rounded-md bg-background hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {getTemplateDisplayName(template)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Urutan Halaman: {index + 2}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => onEdit(template.id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => onRemove(template.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onAddNew} className="w-full">
          <PlusCircle className="w-4 h-4 mr-2" />
          Tambah Template Baru
        </Button>
      </CardFooter>
    </Card>
  );
}