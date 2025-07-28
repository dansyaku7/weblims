export const defaultHeatStressRow = {
  location: '',
  time: '',
  humidity: '',
  wetTemp: '',
  dewTemp: '',
  globeTemp: '',
  wbgtIndex: '-', // Biasanya dihitung, untuk form kita buat default
  method: 'SNI 16-7063-2004',
};

export const defaultHeatStressSampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '',
};

// Data untuk tabel referensi WBGT INDEX, bisa dipindahkan ke sini jika perlu
export const wbgtIndexWorkload = [
    { setting: '75% Work, 25% Rest, each hour', light: '31.0', medium: '28.0', heavy: '26.0', veryHeavy: '-' },
    { setting: '50% Work, 50% Rest, each hour', light: '31.5', medium: '29.5', heavy: '27.5', veryHeavy: '26.5' },
    { setting: '25% Work, 75% Rest, each hour', light: '32.0', medium: '30.5', heavy: '29.5', veryHeavy: '28.5' },
    { setting: 'Continuous Work', light: '30.0', medium: '26.5', heavy: '25.0', veryHeavy: '-' },
];