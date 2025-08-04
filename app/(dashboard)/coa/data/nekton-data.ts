import { nanoid } from 'nanoid';

// Struktur untuk satu baris data spesies
export interface NektonResultRow {
  id: string;
  category: string;
  species: string;
  abundance: string;
}

// Struktur untuk data ringkasan
export interface NektonSummary {
  totalN: string;
  taxaTotalS: string;
  diversityH: string;
  equitabilityE: string;
  dominationD: string;
}

// Struktur untuk satu set data (misalnya, Upstream atau Downstream)
export interface NektonDataSet {
  results: NektonResultRow[];
  summary: NektonSummary;
}

// Nilai default untuk satu baris spesies baru
export const defaultNektonRow: Omit<NektonResultRow, 'id'> = {
  category: '',
  species: '',
  abundance: '',
};

// Nilai default untuk informasi sampel umum
export const defaultNektonSampleInfo = {
  sampleNo: '',
  samplingLocation: '', // Ini akan diisi 'Upstream' atau 'Downstream' di dokumen
  samplingTime: '',
  notes: `Diversity Index, Shannon-Wiener Value Criteria: H’ < 1 (Low Diversity), 1 < H’ < 3 (Medium Diversity), H’ > 3 (High Diversity)\nEquitability Index Value Criteria: E < 0.4 (Low Equitability), 0.4 < E < 0.6 (Medium Equitability), E > 0.6 (High Equitability)\nDomination Index Value Criteria: 0.00 < D < 0.50 (Low Domination), 0.50 < D < 0.75 (Medium Domination), 0.75 < D < 1 (High Domination)`,
};

// Nilai default untuk seluruh template Nekton saat pertama kali dibuat
export const defaultNektonTemplate = {
  sampleInfo: defaultNektonSampleInfo,
  showKanLogo: true,
  // Kita siapkan struktur untuk Upstream dan Downstream sesuai contoh
  upstream: {
    results: [
      { id: nanoid(), category: 'ARTHROPODA', species: 'Caridea sp.', abundance: '' },
      { id: nanoid(), category: 'CHORDATA', species: 'Chanos chanos', abundance: '' },
      { id: nanoid(), category: 'CHORDATA', species: 'Channa striata', abundance: '' },
      { id: nanoid(), category: 'CHORDATA', species: 'Kurtus gulliveri', abundance: '' },
      { id: nanoid(), category: 'CHORDATA', species: 'Lates calcarifer', abundance: '' },
      { id: nanoid(), category: 'CHORDATA', species: 'Lutjanus campechanus', abundance: '' },
      { id: nanoid(), category: 'CHORDATA', species: 'Mystus nemurus', abundance: '' },
    ],
    summary: {
      totalN: '',
      taxaTotalS: '',
      diversityH: '',
      equitabilityE: '',
      dominationD: '',
    },
  },
  downstream: {
    results: [
        { id: nanoid(), category: 'ARTHROPODA', species: 'Caridea sp.', abundance: '' },
        { id: nanoid(), category: 'CHORDATA', species: 'Chanos chanos', abundance: '' },
        { id: nanoid(), category: 'CHORDATA', species: 'Channa striata', abundance: '' },
        { id: nanoid(), category: 'CHORDATA', species: 'Kurtus gulliveri', abundance: '' },
        { id: nanoid(), category: 'CHORDATA', species: 'Lates calcarifer', abundance: '' },
        { id: nanoid(), category: 'CHORDATA', species: 'Lutjanus campechanus', abundance: '' },
        { id: nanoid(), category: 'CHORDATA', species: 'Mystus nemurus', abundance: '' },
    ],
    summary: {
      totalN: '',
      taxaTotalS: '',
      diversityH: '',
      equitabilityE: '',
      dominationD: '',
    },
  },
};
