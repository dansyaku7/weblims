// Nilai default untuk informasi sampel Clean Water
export const defaultCleanWaterSampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '',
  notes: '', // Untuk catatan kaki dinamis
};

// Regulasi: Permenkes No. 32 Tahun 2017
export const cleanWaterParamsPermenkes32 = [
  { category: 'Physical Parameters', name: 'Turbidity', unit: 'NTU', standard: '25', method: 'SNI 06-6989.25-2005' },
  { name: 'Color', unit: 'Pt-Co', standard: '50', method: 'SM 23rd 2120C-2017' },
  { name: 'Total Dissolve Solids (TDS)', unit: 'mg/L', standard: '1000', method: 'SNI 6989.27:2019' },
  { name: 'Temperature', unit: '°C', standard: 'Ambient Temp. ± 3 °C', method: 'SNI 06-6989.23-2005' },
  { name: 'Taste', unit: '-', standard: 'No Taste', method: 'Organoleptic' },
  { name: 'Odor', unit: '-', standard: 'No Odor', method: 'Organoleptic' },
  { category: 'Chemistry Parameters', name: 'pH', unit: '-', standard: '6.5 – 8.5', method: 'SNI 6989.11:2019' },
  { name: 'Iron (Fe)', unit: 'mg/L', standard: '1', method: 'SM 23rd 3120B-2017' },
  { name: 'Fluoride (F)', unit: 'mg/L', standard: '1.5', method: 'SNI 06-6989.29-2005' },
  { name: 'Total Hardness (CaCO3)', unit: 'mg/L', standard: '500', method: 'SM 23rd 2340B-2017' },
  { name: 'Manganese (Mn)', unit: 'mg/L', standard: '0.5', method: 'SM 23rd 3120B-2017' },
  { name: 'Nitrate (NO3-N)', unit: 'mg/L', standard: '10', method: 'SNI 6989.79-2011' },
  { name: 'Nitrite (NO2-N)', unit: 'mg/L', standard: '1', method: 'SNI 06-6989.9-2004' },
  { name: 'Cyanide (CN)', unit: 'mg/L', standard: '0.1', method: 'SNI 6989.77-2011' },
  { name: 'Detergent (MBAS)', unit: 'mg/L', standard: '0.05', method: 'SNI 06-6989.51-2005' },
  { name: 'Mercury (Hg)', unit: 'mg/L', standard: '0.001', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Arsenic (As)', unit: 'mg/L', standard: '0.05', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Cadmium (Cd)', unit: 'mg/L', standard: '0.005', method: 'SM 23rd 3120B-2017' },
  { name: 'Chromium Hexavalent (Cr6+)', unit: 'mg/L', standard: '0.05', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Selenium (Se)', unit: 'mg/L', standard: '0.01', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Zinc (Zn)', unit: 'mg/L', standard: '15', method: 'SM 23rd 3120B-2017' },
  { name: 'Sulfate (SO4)', unit: 'mg/L', standard: '400', method: 'SNI 6989.20-2019' },
  { name: 'Lead (Pb)', unit: 'mg/L', standard: '0.05', method: 'SM 23rd 3120B-2017' },
  { name: 'Permanganate Number (KMnO4)', unit: 'mg/L', standard: '10', method: 'SNI 06-6989.22-2004' },
  { category: 'Microbiology Parameters', name: 'Total Coliform', unit: 'CFU/100mL', standard: '50', method: 'AOAC OMA 966.24' },
  { name: 'E-Coliform', unit: 'CFU/100mL', standard: '0', method: 'AOAC OMA 966.24' },
];

// Regulasi: Permenkes No. 2 Tahun 2023
export const cleanWaterParamsPermenkes2 = [
  { category: 'Physical Parameters', name: 'Temperature', unit: '°C', standard: 'Ambient Temp. ± 3 °C', method: 'SNI 06-6989.23-2005' },
  { name: 'Total Dissolve Solids (TDS)', unit: 'mg/L', standard: '300', method: 'SNI 6989.27:2019' },
  { name: 'Turbidity', unit: 'NTU', standard: '3', method: 'SNI 06-6989.25-2005' },
  { name: 'Color', unit: 'Pt-Co', standard: '10', method: 'SNI 6989.80:2011' },
  { name: 'Odor', unit: '-', standard: 'No Odor', method: 'Organoleptic' },
  { category: 'Chemistry Parameters', name: 'pH', unit: '-', standard: '6.5 – 8.5', method: 'SNI 6989.11:2019' },
  { name: 'Nitrate (NO3-N)', unit: 'mg/L', standard: '20', method: 'SNI 6989.79-2011' },
  { name: 'Nitrite (NO2-N)', unit: 'mg/L', standard: '3', method: 'SNI 06-6989.9-2004' },
  { name: 'Chromium Hexavalent (Cr6+)', unit: 'mg/L', standard: '0.01', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Iron (Fe)', unit: 'mg/L', standard: '0.2', method: 'SM 23rd 3120B-2017' },
  { name: 'Manganese (Mn)', unit: 'mg/L', standard: '0.1', method: 'SM 23rd 3120B-2017' },
  { category: 'Microbiology Parameters', name: 'E-Coliform', unit: 'CFU/100mL', standard: '0', method: 'AOAC OMA 966.24' },
  { name: 'Total Coliform', unit: 'CFU/100mL', standard: '0', method: 'AOAC OMA 966.24' },
];
