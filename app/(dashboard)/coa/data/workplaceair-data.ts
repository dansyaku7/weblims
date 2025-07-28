// Nilai default untuk informasi sampel Workplace Air
export const defaultWorkplaceAirSampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '',
  notes: '', // Untuk catatan kaki dinamis
  temperature: '',
  humidity: '',
};

// Regulasi: Permenaker No. 05 Tahun 2018 (Set A - Tanpa Temp/RH di tabel utama)
export const workplaceAirParamsPermenakerA = [
  { name: 'Sulphur Dioxide (SO2)*', unit: 'mg/m3', standard: '0.25', method: 'IK-7.4.3 (Spectrophotometry)' },
  { name: 'Nitrogen Dioxide (NO2)*', unit: 'BDS', standard: '0.2', method: 'IK-7.4.2 (Spectrophotometry)' },
  { name: 'Carbon Monoxide (CO)*', unit: 'mg/m3', standard: '29', method: 'IK 7.4.19 (Direct Reading)' },
  { name: 'Ammonia (NH3)', unit: 'BDS', standard: '25', method: 'IK-7.4.1 (Spectrophotometry)' },
  { name: 'Oxidant (Ox)', unit: 'BDS', standard: '0.08', method: 'SNI 7119-8:2017' },
  { name: 'Hydrogen Sulfide (H2S)*', unit: 'BDS', standard: '1', method: 'SNI 8605:2018' },
  { name: 'Hydrocarbon (HC)', unit: 'BDS', standard: '1000', method: 'Gas Chromatography' },
  { name: 'Lead (Pb)', unit: 'mg/m3', standard: '0.05', method: 'ICP-OES' },
  { name: 'Total Suspended Particulates (TSP)', unit: 'mg/m3', standard: '10', method: 'SNI 16-7058-2004' },
];

// Regulasi: Permenaker No. 05 Tahun 2018 (Set B - Dengan Temp/RH di tabel utama)
export const workplaceAirParamsPermenakerB = [
  { name: 'Temperature', unit: '°C', standard: '23 - 26', method: 'Direct Reading' },
  { name: 'Relative Humidity (%RH)', unit: '%', standard: '40 - 60', method: 'Direct Reading' },
  { name: 'Sulphur Dioxide (SO2)*', unit: 'mg/m3', standard: '0.25', method: 'IK-7.4.3 (Spectrophotometry)' },
  { name: 'Nitrogen Dioxide (NO2)*', unit: 'BDS', standard: '0.2', method: 'IK-7.4.2 (Spectrophotometry)' },
  { name: 'Carbon Monoxide (CO)*', unit: 'mg/m3', standard: '29', method: 'IK 7.4.19 (Direct Reading)' },
  { name: 'Ammonia (NH3)', unit: 'BDS', standard: '25', method: 'IK-7.4.1 (Spectrophotometry)' },
  { name: 'Oxidant (Ox)', unit: 'BDS', standard: '0.08', method: 'SNI 7119-8:2017' },
  { name: 'Hydrogen Sulfide (H2S)*', unit: 'BDS', standard: '1', method: 'SNI 8605:2018' },
  { name: 'Hydrocarbon (HC)', unit: 'BDS', standard: '1000', method: 'Gas Chromatography' },
  { name: 'Lead (Pb)', unit: 'mg/m3', standard: '0.05', method: 'ICP-OES' },
  { name: 'Total Suspended Particulates (TSP)', unit: 'mg/m3', standard: '10', method: 'SNI 16-7058-2004' },
];

// Regulasi: Kepmenkes No. 1405/MENKES/SK/XI/2002
export const workplaceAirParamsMenkes1405 = [
    { name: 'Temperature', unit: '°C', standard: '18 - 28', method: 'Direct Reading' },
    { name: 'Humidity', unit: '%RH', standard: '40 - 60', method: 'Direct Reading' },
    { name: 'Total Suspended Particulates (TSP)', unit: 'mg/m3', standard: '0.15', method: 'SNI 16-7058-2004' },
    { name: 'Hydrogen Sulfide (H2S)*', unit: 'ppm', standard: '-', method: 'SNI 8605:2018' },
    { name: 'Ammonia (NH3)', unit: 'ppm', standard: '25', method: 'IK-7.4.1 (Spectrophotometry)' },
    { name: 'Carbon Monoxide (CO)*', unit: 'mg/m3', standard: '29', method: 'IK 7.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)*', unit: 'ppm', standard: '3.0', method: 'IK-7.4.2 (Spectrophotometry)' },
    { name: 'Sulphur Dioxide (SO2)*', unit: 'mg/m3', standard: '5.2', method: 'IK-7.4.3 (Spectrophotometry)' },
];
