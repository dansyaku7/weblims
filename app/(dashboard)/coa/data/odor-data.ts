// app/dashboard/coa/data/odor-data.ts

// Template A: Sesuai Permenaker No. 5 2018 (Set 1)
export const odorParamsPermenakerA = [
  { id: 1, name: 'Ethyl Acetate', standard: '400', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
  { id: 2, name: 'Benzene', standard: '0,5', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
  { id: 3, name: 'Toluene', standard: '20', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
  { id: 4, name: 'Xylene', standard: '100', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
];

// Template B: Sesuai Permenaker No. 5 2018 (Set 2)
export const odorParamsPermenakerB = [
  { id: 1, name: 'Methyl Ethyl Ketone (C4H8O)', standard: '200', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
  { id: 2, name: 'Aceton (C3H6O)', standard: '250', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
  { id: 3, name: 'Toluene (C7H8)', standard: '20', unit: 'BDS', method: 'Gas Chromatography', testingResult: '' },
];

// Template C: Sesuai Kepmen LH No. 48 Tahun 1996
export const odorParamsKepmenLH = [
  { id: 1, name: 'Ammonia (NH3)*', standard: '2.0', unit: 'ppm', method: 'SNI 7119.1-2005', testingResult: '' },
  { id: 2, name: 'Methyl Mercaptan (CH3SH)', standard: '0.002', unit: 'ppm', method: 'NIOSH 2542', testingResult: '' },
  { id: 3, name: 'Hydrogen Sulfide (H2S)', standard: '0.02', unit: 'ppm', method: 'IK-7.4.22 (Spectrophotometry)', testingResult: '' },
  { id: 4, name: 'Methyl Sulfide ((CH3)2)S', standard: '0.01', unit: 'ppm', method: 'OSHA PV2210', testingResult: '' },
  { id: 5, name: 'Styrene (C6H5CHCH2)', standard: '0.1', unit: 'ppm', method: 'Gas Chromatography', testingResult: '' },
];

// Nilai awal untuk info sampel Odor, mencakup semua kemungkinan field
export const defaultOdorSampleInfo = {
  sampleNo: '',
  // Fields untuk Workplace Environment
  temperatureWorkplace: '',
  humidityWorkplace: '',
  // Fields untuk Ambient Environment
  coordinate: '',
  temperatureAmbient: '',
  pressure: '',
  humidityAmbient: '',
  windSpeed: '',
  windDirection: '',
  weather: '',
};