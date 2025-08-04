"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Save, FileSearch, Settings, PlusCircle, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { NektonDataSet, NektonResultRow, defaultNektonRow } from "../data/nekton-data";

// Definisikan tipe data untuk template Nekton
interface NektonTemplate {
  sampleInfo: {
    sampleNo: string;
    samplingLocation: string;
    samplingTime: string;
    notes: string;
  };
  upstream: NektonDataSet;
  downstream: NektonDataSet;
  showKanLogo: boolean;
}

interface NektonFormProps {
  template: NektonTemplate;
  nomorFppsPrefix: string;
  onTemplateChange: (template: NektonTemplate) => void;
  onSave: (template: NektonTemplate) => void;
  onBack: () => void;
  onPreview: () => void;
}

export function NektonForm({
  template,
  nomorFppsPrefix,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}: NektonFormProps) {

  // --- HANDLER UNTUK DATA UMUM ---
  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, [name]: value },
    });
  };

  const handleSampleNoSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const suffix = e.target.value;
    const newSampleNo = `${nomorFppsPrefix}${suffix}`;
    onTemplateChange({
      ...template,
      sampleInfo: { ...template.sampleInfo, sampleNo: newSampleNo },
    });
  };

  const sampleNoSuffix = template.sampleInfo.sampleNo.startsWith(nomorFppsPrefix)
    ? template.sampleInfo.sampleNo.substring(nomorFppsPrefix.length)
    : "";

  // --- HANDLER UNTUK DATA SPESIFIK NEKTON (UPSTREAM/DOWNSTREAM) ---
  const handleDataSetChange = (
    stream: 'upstream' | 'downstream',
    field: 'results' | 'summary',
    value: any
  ) => {
    onTemplateChange({
      ...template,
      [stream]: {
        ...template[stream],
        [field]: value,
      },
    });
  };

  const handleResultRowChange = (
    stream: 'upstream' | 'downstream',
    index: number,
    field: keyof Omit<NektonResultRow, 'id'>,
    value: string
  ) => {
    const newResults = [...template[stream].results];
    newResults[index] = { ...newResults[index], [field]: value };
    handleDataSetChange(stream, 'results', newResults);
  };

  const handleAddRow = (stream: 'upstream' | 'downstream') => {
    const newRow = { ...defaultNektonRow, id: nanoid() };
    const newResults = [...template[stream].results, newRow];
    handleDataSetChange(stream, 'results', newResults);
  };

  const handleRemoveRow = (stream: 'upstream' | 'downstream', id: string) => {
    const newResults = template[stream].results.filter((row) => row.id !== id);
    handleDataSetChange(stream, 'results', newResults);
  };

  const handleSummaryChange = (
    stream: 'upstream' | 'downstream',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newSummary = { ...template[stream].summary, [name]: value };
    handleDataSetChange(stream, 'summary', newSummary);
  };

  // Komponen render untuk satu set data (Upstream/Downstream)
  const renderDataSetForm = (stream: 'upstream' | 'downstream', title: string) => {
    const dataSet = template[stream];
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold border-b pb-3">{title}</h3>
        {dataSet.results.map((row, index) => (
          <div key={row.id} className="p-4 rounded-lg border bg-muted/30 space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-foreground">Spesies #{index + 1}</p>
              <Button variant="destructive" size="icon" onClick={() => handleRemoveRow(stream, row.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Kategori</Label>
                <Input value={row.category} onChange={(e) => handleResultRowChange(stream, index, 'category', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Individu / Spesies</Label>
                <Input value={row.species} onChange={(e) => handleResultRowChange(stream, index, 'species', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Abundance (Individu/m²)</Label>
                <Input value={row.abundance} onChange={(e) => handleResultRowChange(stream, index, 'abundance', e.target.value)} className="mt-1" />
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => handleAddRow(stream)}>
          <PlusCircle className="w-4 h-4 mr-2" /> Tambah Spesies
        </Button>

        <div className="p-4 rounded-lg border bg-muted/30 space-y-4 mt-4">
          <h4 className="font-semibold">Ringkasan Data {title}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><Label>TOTAL (N)</Label><Input name="totalN" value={dataSet.summary.totalN} onChange={(e) => handleSummaryChange(stream, e)} className="mt-1" /></div>
            <div><Label>Taxa Total (S)</Label><Input name="taxaTotalS" value={dataSet.summary.taxaTotalS} onChange={(e) => handleSummaryChange(stream, e)} className="mt-1" /></div>
            <div><Label>Diversity Index (H')</Label><Input name="diversityH" value={dataSet.summary.diversityH} onChange={(e) => handleSummaryChange(stream, e)} className="mt-1" /></div>
            <div><Label>Equitability Index (E)</Label><Input name="equitabilityE" value={dataSet.summary.equitabilityE} onChange={(e) => handleSummaryChange(stream, e)} className="mt-1" /></div>
            <div><Label>Domination Index (D)</Label><Input name="dominationD" value={dataSet.summary.dominationD} onChange={(e) => handleSummaryChange(stream, e)} className="mt-1" /></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Nekton</CardTitle>
          <Button variant="outline" onClick={onBack}><ChevronLeft className="mr-2 h-4 w-4" /> Kembali</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-3">Informasi Sampel</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="sampleNo">Sampel No.</Label>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm h-10">{nomorFppsPrefix}</span>
                <Input id="sampleNo" name="sampleNoSuffix" value={sampleNoSuffix} onChange={handleSampleNoSuffixChange} placeholder=".01" className="rounded-l-none" />
              </div>
            </div>
            <div><Label htmlFor="samplingLocation">Lokasi Sampling</Label><Input id="samplingLocation" name="samplingLocation" value={template.sampleInfo.samplingLocation} onChange={handleSampleInfoChange} /></div>
            <div><Label htmlFor="samplingTime">Waktu Sampling</Label><Input id="samplingTime" name="samplingTime" value={template.sampleInfo.samplingTime} onChange={handleSampleInfoChange} /></div>
          </div>
           <div>
              <Label htmlFor="notes">Catatan Kaki</Label>
              <Textarea id="notes" name="notes" value={template.sampleInfo.notes} onChange={handleSampleInfoChange} placeholder="Catatan untuk kriteria indeks..." />
            </div>
        </div>

        {renderDataSetForm('upstream', 'Data Upstream')}
        {renderDataSetForm('downstream', 'Data Downstream')}

        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-3 flex items-center"><Settings className="w-4 h-4 mr-2" /> Pengaturan Halaman</h3>
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
            <div className="space-y-0.5"><Label htmlFor="kan-logo-switch" className="text-base">Tampilkan Logo KAN</Label><p className="text-sm text-muted-foreground">Aktifkan untuk menampilkan logo KAN di header.</p></div>
            <Switch id="kan-logo-switch" checked={template.showKanLogo} onCheckedChange={(value) => onTemplateChange({ ...template, showKanLogo: value })} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onPreview}><FileSearch className="mr-2 h-4 w-4" /> Preview</Button>
        <Button onClick={() => onSave(template)}><Save className="mr-2 h-4 w-4" /> Simpan</Button>
      </CardFooter>
    </Card>
  );
}
