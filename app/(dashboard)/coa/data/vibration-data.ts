// Nilai default untuk informasi sampel Vibration
export const defaultVibrationSampleInfo = {
  sampleNo: '',
  samplingLocation: '', // Lokasi spesifik pengukuran
  samplingTime: '',   // Waktu spesifik pengukuran
  notes: '',          // Catatan kaki untuk standar, misal: Keputusan Menteri Negara Lingkungan Hidup No. 49 Tahun 1996
};

// =================================================================
// 1. Regulasi: Permenaker No. 05 Tahun 2018 (Getaran Seluruh Tubuh)
// =================================================================

// Ini adalah template untuk satu baris input. Pengguna bisa menambah baris sebanyak yang dibutuhkan.
export const vibrationParamsPermenaker5 = [
  { location: '', time: '', unit: 'm/s²', testingResult: '', method: 'Direct Reading' },
];

// Tabel referensi Nilai Ambang Batas (NAB) untuk dibandingkan dengan hasil tes.
export const vibrationReferencePermenaker5 = [
  { exposure: '0.5', threshold: '3.4644' },
  { exposure: '1', threshold: '2.4497' },
  { exposure: '2', threshold: '1.7322' },
  { exposure: '4', threshold: '1.2249' },
  { exposure: '8', threshold: '0.8661' },
];

// =================================================================
// 2. Regulasi: KepmenLH No. 49/1996 (Tingkat Getaran)
// =================================================================

// A. Getaran Kejut
export const vibrationParamsKepmenlh49_Kejut = [
  { location: '', description: 'Vibration at Frequency (Hz)', unit: 'm/s', testingResult: '', time: '', standard: { A: '<2', B: '2-27', C: '>27-40', D: '>140' }, method: 'Direct Reading' },
];

// B. Getaran untuk Kenyamanan dan Kesehatan (Kelas II - Getaran Berkelanjutan)
// Daftar parameter ini sudah lengkap sesuai tabel di lampiran regulasi.
export const vibrationParamsKepmenlh49_Class2 = [
  { location: '', time: '', frequency: '4', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 2', B: '2 – 27', C: '>27 - 40', D: '>140' } },
  { location: '', time: '', frequency: '5', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 7.5', B: '< 7.5 – 25', C: '>24 – 130', D: '>130' } },
  { location: '', time: '', frequency: '6.3', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 7', B: '< 7 – 21', C: '>21 – 110', D: '>110' } },
  { location: '', time: '', frequency: '8', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 6', B: '< 6 - 19', C: '>19 – 100', D: '>100' } },
  { location: '', time: '', frequency: '10', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 5.2', B: '< 5.2 – 16', C: '>16 – 90', D: '>90' } },
  { location: '', time: '', frequency: '12.5', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 4.8', B: '< 4.8 – 15', C: '>15 – 80', D: '>80' } },
  { location: '', time: '', frequency: '16', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 4', B: '< 4 – 14', C: '>14 – 70', D: '>70' } },
  { location: '', time: '', frequency: '20', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 3.8', B: '< 3.8 – 12', C: '>12 – 67', D: '>67' } },
  { location: '', time: '', frequency: '25', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 3.2', B: '<3.2 – 10', C: '>10 – 60', D: '>60' } },
  { location: '', time: '', frequency: '31.5', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 3', B: '< 3 – 9', C: '>9 – 53', D: '>53' } },
  { location: '', time: '', frequency: '40', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 2', B: '< 2 – 8', C: '>8 – 50', D: '>50' } },
  { location: '', time: '', frequency: '50', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 1', B: '< 1 - 7', C: '>7 - 42', D: '>42' } },
];

// C. Getaran untuk Kerusakan Bangunan (Kelas III - Getaran pada Pondasi)
export const vibrationParamsKepmenlh49_Class3 = [
  { location: '', testingResult: '', time: '', standard: { foundation_lt_10: '<10 Hz', foundation_10_15: '10-15 Hz', foundation_50_100: '50-100 Hz', foundation_mix: 'Frequency Mix' }, unit: 'Hz', method: 'Direct Reading' },
];