// data/ssse-data.ts

// Nilai default untuk informasi sampel Stationary Stack Source Emission (SSSE)
export const defaultSSSESampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '',
  samplingMethod: 'Grab', // atau 'Isokinetic'
  notes: '', 
  coordinate: '',
  velocity: '',
  stackTemperature: '', // Untuk beberapa regulasi
};

// Kumpulan data parameter berdasarkan regulasi

// 1. Permen LH No. 13 Tahun 1995 Lampiran VB
export const ssseParamsPermenlh13_Vb = [
  { name: 'Ammonia (NH3)*', unit: 'mg/m3', standard: '0.5', method: 'SNI 19-7117.6-2005' },
  { name: 'Chlorine (Cl2)*', unit: 'mg/m3', standard: '10', method: 'IK.7.4.25 (Spectrophotometry)' },
  { name: 'Hydrogen Chloride (HCl)*', unit: 'mg/m3', standard: '5', method: 'SNI 19-7117.8-2005' },
  { name: 'Hydrogen Fluoride (HF)', unit: 'mg/m3', standard: '10', method: 'SNI 19-7117.9-2005' },
  { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/m3', standard: '1000', method: 'IK–6.4.18 (Direct Reading)' },
  { name: 'Opacity', unit: '%', standard: '35', method: 'SNI 19-7117.11-2005' },
  { name: 'Particulate', unit: 'mg/m3', standard: '350', method: 'SNI 19-7117.12-2005' },
  { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/m3', standard: '800', method: 'IK–6.4.19 (Direct Reading)' },
  { name: 'Hydrogen Sulfide (H2S)', unit: 'mg/m3', standard: '35', method: 'SNI 06-7117.7-2005' },
  { name: 'Mercury (Hg)', unit: 'mg/m3', standard: '5', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Arsenic (As)', unit: 'mg/m3', standard: '8', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Antimony (Sb)', unit: 'mg/m3', standard: '8', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Cadmium (Cd)', unit: 'mg/m3', standard: '8', method: 'ICP-OES' },
  { name: 'Zinc (Zn)', unit: 'mg/m3', standard: '50', method: 'ICP-OES' },
  { name: 'Total Lead (Pb)', unit: 'mg/m3', standard: '12', method: 'ICP-OES' },
];

// 2. Permen LH No. 07 Tahun 2007 Lampiran III (Bahan Bakar Biomassa)
export const ssseParamsPermenlh7_III = [
    { name: 'Particulate', unit: 'mg/m3', standard: '350', method: 'SNI 19-7117.12-2005' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/m3', standard: '800', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/m3', standard: '1000', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Hydrogen Chloride (HCl)*', unit: 'mg/m3', standard: '5', method: 'SNI 19-7117.8-2005' },
    { name: 'Chlorine (Cl2)*', unit: 'mg/m3', standard: '10', method: 'IK.7.4.25 (Spectrophotometry)' },
    { name: 'Ammonia (NH3)*', unit: 'mg/m3', standard: '0.5', method: 'SNI 19-7117.6-2005' },
    { name: 'Hydrogen Fluoride (HF)', unit: 'mg/m3', standard: '10', method: 'SNI 19-7117.9-2005' },
    { name: 'Opacity', unit: '%', standard: '30', method: 'SNI 19-7117.11-2005' },
    { name: 'Hydrogen Sulfide (H2S)', unit: 'mg/m3', standard: '35', method: 'SNI 06-7117.7-2005' },
    { name: 'Mercury (Hg)', unit: 'mg/m3', standard: '5', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Arsenic (As)', unit: 'mg/m3', standard: '8', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Antimony (Sb)', unit: 'mg/m3', standard: '8', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Cadmium (Cd)', unit: 'mg/m3', standard: '8', method: 'ICP-OES' },
    { name: 'Zinc (Zn)', unit: 'mg/m3', standard: '50', method: 'ICP-OES' },
    { name: 'Lead (Pb)', unit: 'mg/m3', standard: '12', method: 'ICP-OES' },
];

// 3. Permen LH No. 07 Tahun 2007 Lampiran IV (Bahan Bakar Batubara)
export const ssseParamsPermenlh7_IV = [
    { name: 'Particulate', unit: 'mg/m3', standard: '230', method: 'SNI 7117.17:2009' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/m3', standard: '750', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/m3', standard: '825', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Opacity', unit: '%', standard: '20', method: 'SNI 19-7117.11-2005' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/m3', standard: '-', method: 'SNI 19.7117.10-2005' },
];

// 4. Permen LH No. 07 Tahun 2007 Lampiran V (Bahan Bakar Minyak)
export const ssseParamsPermenlh7_V = [
    { name: 'Particulate', unit: 'mg/m3', standard: '200', method: 'SNI 7117.17:2009' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/m3', standard: '700', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/m3', standard: '700', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Opacity', unit: '%', standard: '15', method: 'SNI 19-7117.11-2005' },
];

// 5. Permen LH No. 07 Tahun 2007 Lampiran VI (Bahan Bakar Gas)
export const ssseParamsPermenlh7_VI = [
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/m3', standard: '150', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/m3', standard: '650', method: 'IK–6.4.18 (Direct Reading)' },
];

// 6. Permen LHK No. 11 Tahun 2021 Lampiran I No. 1 (Genset)
export const ssseParamsPermenLhk11_I1 = [
    { name: 'Nitrogen Oxide (NOx)*', unit: 'mg/Nm3', standard: '3400', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '170', method: 'SNI 19.7117.10-2005' },
    { name: 'Oxygen (O2)*', unit: '%', standard: '-', method: 'SNI 19.7117.10-2005' },
];

// 7. Permen LHK No. 11 Tahun 2021 Lampiran I No. 2 (Genset)
export const ssseParamsPermenLhk11_I2 = [
    { name: 'Nitrogen Oxide (NOx)*', unit: 'mg/Nm3', standard: '1850', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '77', method: 'SNI 19.7117.10-2005' },
    { name: 'Particulate*', unit: 'mg/Nm3', standard: '95', method: 'SNI 7117.17:2009' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '160', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Oxygen (O2)*', unit: '%', standard: '-', method: 'SNI 19.7117.10-2005' },
    { name: 'Percent (%) of Isokinetic*', unit: '%', standard: '90-110', method: 'SNI 7117.17-2009' },
    { name: 'Volumetric Flow Rate *', unit: 'm3/s', standard: '-', method: 'SNI 7117.14-2009' },
    { name: 'Number Of Traverse Point*', unit: '-', standard: '-', method: 'SNI 7117.13-2009' },
];

// 8. Permen LHK No. 11 Tahun 2021 Lampiran I No. 3 (Genset)
export const ssseParamsPermenLhk11_I3 = [
    { name: 'Nitrogen Oxide (NOx)*', unit: 'mg/Nm3', standard: '2300', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '168', method: 'SNI 19.7117.10-2005' },
    { name: 'Particulate*', unit: 'mg/Nm3', standard: '90', method: 'SNI 7117.17:2009' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '150', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Oxygen (O2)*', unit: '%', standard: '-', method: 'SNI 19.7117.10-2005' },
    { name: 'Percent (%) of Isokinetic*', unit: '%', standard: '90-110', method: 'SNI 7117.17-2009' },
    { name: 'Volumetric Flow Rate *', unit: 'm3/s', standard: '-', method: 'SNI 7117.14-2009' },
    { name: 'Number Of Traverse Point*', unit: '-', standard: '-', method: 'SNI 7117.13-2009' },
];

// 9. Permen LHK No. P.15/MENLHK/SETJEN/KUM.1/4/2019 Lampiran III A
export const ssseParamsPermenLhk15_IIIA = [
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '800', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NOx)*', unit: 'mg/Nm3', standard: '1400', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '600', method: 'SNI 19.7117.10-2005' },
    { name: 'Particulate', unit: 'mg/Nm3', standard: '150', method: 'SNI 19-7117.12-2005' },
    { name: 'Opacity', unit: '%', standard: '-', method: 'SNI 19-7117.11-2005' },
];

// 10. Permen LHK No. P.15/MENLHK/SETJEN/KUM.1/4/2019 Lampiran IX A
export const ssseParamsPermenLhk15_IXA = [
    { name: 'Nitrogen Oxides (NOx)*', unit: 'mg/Nm3', standard: '1400', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '600', method: 'SNI 19.7117.10-2005' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '-', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Particulate', unit: 'mg/Nm3', standard: '-', method: 'SNI 19-7117.12-2005' },
    { name: 'Opacity', unit: '%', standard: '-', method: 'SNI 19-7117.11-2005' },
    { name: 'Oxygen (O2)*', unit: '%', standard: '-', method: 'SNI 19-7117.10-2005' },
    { name: 'Percent (%) of Isokinetic*', unit: '%', standard: '90-110', method: 'SNI 7117.17-2009' },
    { name: 'Volumetric Flow Rate*', unit: 'm3/s', standard: '-', method: 'SNI 7117.14-2009' },
    { name: 'Number Of Traverse Point*', unit: '-', standard: '-', method: 'SNI 7117.13-2009' },
];

// 11. Permen LHK No. P.15/MENLHK/SETJEN/KUM.1/4/2019 Lampiran IX B
export const ssseParamsPermenLhk15_IXB = [
    { name: 'Nitrogen Oxides (NOx)*', unit: 'mg/Nm3', standard: '1200', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '540', method: 'SNI 19.7117.10-2005' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '600', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Particulate', unit: 'mg/Nm3', standard: '120', method: 'SNI 19-7117.12-2005' },
    { name: 'Opacity', unit: '%', standard: '-', method: 'SNI 19-7117.11-2005' },
    { name: 'Oxygen (O2)*', unit: '%', standard: '-', method: 'SNI 19-7117.10-2005' },
    { name: 'Percent (%) of Isokinetic*', unit: '%', standard: '90-110', method: 'SNI 7117.17-2009' },
    { name: 'Volumetric Flow Rate*', unit: 'm3/s', standard: '-', method: 'SNI 7117.14-2009' },
    { name: 'Number Of Traverse Point*', unit: '-', standard: '-', method: 'SNI 7117.13-2009' },
];

// 12. Permen LH No. 21 Tahun 2008 Lampiran III A (PLTD)
export const ssseParamsPermenlh21_IIIA = [
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '800', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NOx)*', unit: 'mg/Nm3', standard: '800', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Particulate', unit: 'mg/Nm3', standard: '150', method: 'SNI 19-7117.12-2005' },
    { name: 'Opacity', unit: '%', standard: '20', method: 'SNI 19-7117.11-2005' },
];

// 13. Permen LH No. 21 Tahun 2008 Lampiran IV A (PLTD)
export const ssseParamsPermenlh21_IVA = [
    { name: 'Particulate', unit: 'mg/Nm3', standard: '150', method: 'SNI 19-7117.12-2005' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/Nm3', standard: '600', method: 'SNI 19.7117.10-2005' },
    { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/Nm3', standard: '1000', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/Nm3', standard: '800', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Opacity', unit: '%', standard: '20', method: 'SNI 19-7117.11-2005' },
];

// 14. Kepgub DKI Jakarta No. 670 Tahun 2000 Lampiran III
export const ssseParamsKepgubDKI670_III = [
    { name: 'Ammonia (NH3)*', unit: 'mg/m3', standard: '0.5', method: 'SNI 19-7117.6-2005' },
    { name: 'Chlorine (Cl2)*', unit: 'mg/m3', standard: '10', method: 'IK.7.4.25 (Spectrophotometry)' },
    { name: 'Hydrogen Chloride (HCl)*', unit: 'mg/m3', standard: '5', method: 'SNI 19-7117.8-2005' },
    { name: 'Hydrogen Fluoride (HF)', unit: 'mg/m3', standard: '10', method: 'SNI 19-7117.9-2005' },
    { name: 'Nitrogen Dioxide (NO2)', unit: 'mg/m3', standard: '1000', method: 'IK–6.4.18 (Direct Reading)' },
    { name: 'Opacity', unit: '%', standard: '35', method: 'SNI 19-7117.11-2005' },
    { name: 'Particulate', unit: 'mg/m3', standard: '350', method: 'SNI 19-7117.12-2005' },
    { name: 'Sulfur Dioxide (SO2)*', unit: 'mg/m3', standard: '800', method: 'IK–6.4.19 (Direct Reading)' },
    { name: 'Hydrogen Sulfide (H2S)', unit: 'mg/m3', standard: '35', method: 'SNI 06-7117.7-2005' },
    { name: 'Mercury (Hg)', unit: 'mg/m3', standard: '5', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Arsenic (As)', unit: 'mg/m3', standard: '8', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Antimony (Sb)', unit: 'mg/m3', standard: '8', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Cadmium (Cd)', unit: 'mg/m3', standard: '8', method: 'ICP-OES' },
    { name: 'Zinc (Zn)', unit: 'mg/m3', standard: '50', method: 'ICP-OES' },
    { name: 'Total Lead (Pb)', unit: 'mg/m3', standard: '12', method: 'ICP-OES' },
];
