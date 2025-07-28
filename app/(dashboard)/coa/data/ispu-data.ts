
// Nilai default untuk informasi sampel ISPU
export const defaultISPUSampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '', // DIUBAH: Dikosongkan agar bisa diisi manual
  notes: '*** Minister of Environmental and Forestry Decree of Republic Indonesia No. P.14/Menlhk/Setjen/Kum.1/7/2020 Regarding Air Pollution Standard Index (Annex II)',
};

// Parameter default untuk ISPU
export const defaultISPUParameters = [
  { 
    name: 'PM10 (Particulate Matters)', 
    samplingTime: '24 Hours',
    unit: 'µg/m3',
    method: 'Direct Reading',
    testingResult: '',
    ispuCalculationResult: '',
    ispuCategory: '',
    isVisible: true,
  },
  { 
    name: 'PM2.5 (Particulate Matters)', 
    samplingTime: '24 Hours',
    unit: 'µg/m3',
    method: 'Direct Reading',
    testingResult: '',
    ispuCalculationResult: '',
    ispuCategory: '',
    isVisible: true,
  },
];

// Tabel kategori ISPU untuk ditampilkan di dokumen
export const ispuCategories = [
    { category: 'Good', color: 'Green', range: '1 – 50' },
    { category: 'Medium', color: 'Blue', range: '51 – 100' },
    { category: 'Not Healthy', color: 'Yellow', range: '101 – 200' },
    { category: 'Very Unhealthy', color: 'Red', range: '201 – 300' },
    { category: 'Dangerous', color: 'Black', range: '≥ 301' },
];
