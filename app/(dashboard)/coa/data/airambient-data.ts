// Nilai default untuk informasi sampel Air Ambient
export const defaultAirAmbientSampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '', 
  samplingMethod: 'Grab / 24 Hours', // DIBUATKAN properti baru
  notes: '', 
  coordinate: '',
  temperature: '',
  pressure: '',
  humidity: '',
  windSpeed: '',
  windDirection: '',
  weather: '',
};


// Regulasi: PP No. 22 Tahun 2021, Lampiran VII
const baseParamsPP22 = [
  { name: 'Sulphur Dioxide (SO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '150', t24h: '75', t1y: '45' }, unit: 'µg/m3', method: 'SNI 7119-7:2017' },
  { name: 'Carbon Monoxide (CO)*', samplingTime: '1 Jam, 8 Jam', standard: { t1h: '10000', t8h: '4000', t1y: '-' }, unit: 'µg/m3', method: 'IK 7.4.19 (Direct Reading)' },
  { name: 'Nitrogen Dioxide (NO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '200', t24h: '65', t1y: '50' }, unit: 'µg/m3', method: 'SNI 19-7119.2-2005' },
  { name: 'Oxidant (Ox)*', samplingTime: '1 Jam, 8 Jam, 1 Tahun', standard: { t1h: '150', t8h: '100', t1y: '35' }, unit: 'µg/m3', method: 'SNI 7119-8:2017' },
  { name: 'Hydrocarbon Non Methane (NMHC)', samplingTime: '3 Jam', standard: { t3h: '160', t1h: '-', t24h: '-' }, unit: 'µg/m3', method: 'Gas Chromatography' },
  { name: 'Total Suspended Particulates (TSP)*', samplingTime: '24 Jam', standard: { t1h: '-', t24h: '230', t1y: '-' }, unit: 'µg/m3', method: 'SNI 7119.3:2017' },
  { name: 'PM10 (Particulate Matters)', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '75', t1y: '40', t1h: '-' }, unit: 'µg/m3', method: 'Direct Reading' },
  { name: 'PM2.5 (Particulate Matters)', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '55', t1y: '15', t1h: '-' }, unit: 'µg/m3', method: 'Direct Reading' },
  { name: 'Lead (Pb)', samplingTime: '24 Jam', standard: { t24h: '2', t1h: '-', t1y: '-' }, unit: 'µg/m3', method: 'ICP-OES' },
];

const odorParamsKepmen50 = [
    { name: 'Ammonia (NH3)*', samplingTime: '1 Jam', standard: { t1h: '2.0' }, unit: 'ppm', method: 'SNI 19-7119.1-2005' },
    { name: 'Hydrogen Sulfide (H2S)', samplingTime: '1 Jam', standard: { t1h: '0.02' }, unit: 'ppm', method: 'IK-7.4.22 (Spectrophotometry)' },
];

export const airAmbientParamsPP22 = [...baseParamsPP22];
export const airAmbientParamsPP22PlusOdor = [...baseParamsPP22, ...odorParamsKepmen50];

// Regulasi: PP No. 41 Tahun 1999
export const airAmbientParamsPP41 = [
    { name: 'Sulphur Dioxide (SO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '900', t24h: '365', t1y: '60' }, unit: 'µg/Nm3', method: 'SNI 7119-7:2017' },
    { name: 'Carbon Monoxide (CO)*', samplingTime: '1 Jam, 24 Jam', standard: { t1h: '30000', t24h: '10000', t1y: '-' }, unit: 'µg/Nm3', method: 'IK 7.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '400', t24h: '150', t1y: '100' }, unit: 'µg/Nm3', method: 'SNI 19-7119.2-2005' },
    { name: 'Oxidant (O3)*', samplingTime: '1 Jam, 1 Tahun', standard: { t1h: '235', t1y: '50', t24h: '-' }, unit: 'µg/Nm3', method: 'SNI 7119-8:2017' },
    { name: 'Hydrocarbon (HC)', samplingTime: '3 Jam', standard: { t3h: '160', t1h: '-', t24h: '-' }, unit: 'µg/Nm3', method: 'Gas Chromatography' },
    { name: 'PM10 (Particulate Matters)', samplingTime: '24 Jam', standard: { t24h: '150', t1h: '-', t1y: '-' }, unit: 'µg/Nm3', method: 'Direct Reading' },
    { name: 'PM2.5 (Particulate Matters)', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '65', t1y: '15', t1h: '-' }, unit: 'µg/Nm3', method: 'Direct Reading' },
    { name: 'Total Suspended Particulates (TSP)*', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '230', t1y: '90', t1h: '-' }, unit: 'µg/Nm3', method: 'SNI 7119.3:2017' },
    { name: 'Lead (Pb)', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '2', t1y: '1', t1h: '-' }, unit: 'µg/Nm3', method: 'ICP-OES' },
];

// Regulasi: Kepgub DKI Jakarta No. 551 Tahun 2001
const baseParamsDKI551 = [
    { name: 'Sulphur Dioxide (SO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '900', t24h: '260', t1y: '60' }, unit: 'µg/Nm3', method: 'SNI 7119-7:2017' },
    { name: 'Carbon Monoxide (CO)*', samplingTime: '1 Jam, 24 Jam', standard: { t1h: '26000', t24h: '9000', t1y: '-' }, unit: 'µg/Nm3', method: 'IK 7.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '400', t24h: '92.5', t1y: '60' }, unit: 'µg/Nm3', method: 'SNI 19-7119.2-2005' },
    { name: 'Oxidant (O3)*', samplingTime: '1 Jam, 1 Tahun', standard: { t1h: '200', t1y: '30', t24h: '-' }, unit: 'µg/Nm3', method: 'SNI 7119-8:2017' },
    { name: 'Hydrocarbon (HC)', samplingTime: '3 Jam', standard: { t3h: '160', t1h: '-', t24h: '-' }, unit: 'µg/Nm3', method: 'Gas Chromatography' },
    { name: 'PM10 (Particulate Matters)', samplingTime: '24 Jam', standard: { t24h: '150', t1h: '-', t1y: '-' }, unit: 'µg/Nm3', method: 'Direct Reading' },
    { name: 'PM2.5 (Particulate Matters)', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '65', t1y: '15', t1h: '-' }, unit: 'µg/Nm3', method: 'Direct Reading' },
    { name: 'Total Suspended Particulates (TSP)*', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '230', t1y: '90', t1h: '-' }, unit: 'µg/Nm3', method: 'SNI 7119.3:2017' },
    { name: 'Lead (Pb)', samplingTime: '24 Jam, 1 Tahun', standard: { t24h: '2', t1y: '1', t1h: '-' }, unit: 'µg/Nm3', method: 'ICP-OES' },
];

export const airAmbientParamsDKI551 = [...baseParamsDKI551];
export const airAmbientParamsDKI551PlusOdor = [...baseParamsDKI551, ...odorParamsKepmen50];

// Regulasi: Pergub Jabar No. 660.31/SK/624/BKPMD/82
export const airAmbientParamsJabar624 = [
    { name: 'Carbon Monoxide (CO)*', samplingTime: '1 Jam, 1 Tahun', standard: { t1h: '10', t1y: '-', t24h: '-' }, unit: 'mg/m3', method: 'IK 7.4.19 (Direct Reading)' },
    { name: 'Nitrogen Dioxide (NO2)*', samplingTime: '1 Jam, 1 Tahun', standard: { t1h: '100', t1y: '-', t24h: '-' }, unit: 'µg/m3', method: 'SNI 19-7119.2-2005' },
    { name: 'Sulphur Dioxide (SO2)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '265', t24h: '80', t1y: '-' }, unit: 'µg/m3', method: 'SNI 7119-7:2017' },
    { name: 'Hydrogen Sulfide (H2S)', samplingTime: '1 Jam', standard: { t1h: '24', t24h: '-', t1y: '-' }, unit: 'µg/m3', method: 'IK-7.4.22 (Spectrophotometry)' },
    { name: 'Hydrocarbon (HC)', samplingTime: '1 Jam', standard: { t1h: '160', t24h: '-', t1y: '-' }, unit: 'µg/m3', method: 'Gas Chromatography' },
    { name: 'Total Suspended Particulates (TSP)*', samplingTime: '1 Jam, 24 Jam, 1 Tahun', standard: { t1h: '260', t24h: '75', t1y: '-' }, unit: 'µg/m3', method: 'SNI 7119.3:2017' },
    { name: 'Lead (Pb)', samplingTime: '1 Jam, 30 Hari', standard: { t1h: '1.5', t30d: '-', t24h: '-' }, unit: 'µg/m3', method: 'ICP-OES' },
    { name: 'Ammonia (NH3)*', samplingTime: '1 Jam, 24 Jam', standard: { t1h: '2', t24h: '-', t1y: '-' }, unit: 'ppm', method: 'SNI 19-7119.1-2005' },
    { name: 'Oxidant (Ox)*', samplingTime: '1 Jam', standard: { t1h: '160', t24h: '-', t1y: '-' }, unit: 'µg/m3', method: 'SNI 7119-8:2017' },
];
