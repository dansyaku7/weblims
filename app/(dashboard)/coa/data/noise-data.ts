// data/noise-data.ts
import { nanoid } from 'nanoid';

// Nilai default untuk informasi sampel umum
export const defaultNoiseSampleInfo = {
  sampleNo: '',
  samplingLocation: '(See Table)',
  samplingTime: '(See Table)',
  samplingMethod: '24 Hours',
  notes: '',
};

// Nilai default untuk satu baris/lokasi pada regulasi sederhana
export const defaultNoiseSimpleRow = {
  id: nanoid(),
  location: '',
  time: '',
  testingResult: '',
};

// Nilai default untuk satu titik pengukuran pada regulasi kompleks
const createComplexMeasurementPoint = (point: string) => ({
    id: nanoid(),
    point,
    leq: '',
    ls: '',
    lm: '',
    lsm: '',
});

// Struktur data untuk regulasi kompleks (Kepmen LH 48 & Kepgub DKI 551)
export const defaultNoiseComplexSetup = [
    {
        id: nanoid(),
        locationName: 'UP WIND',
        standard: '70',
        measurements: [
            createComplexMeasurementPoint('L1 / T1'),
            createComplexMeasurementPoint('L2 / T2'),
            createComplexMeasurementPoint('L3 / T3'),
            createComplexMeasurementPoint('L4 / T4'),
            createComplexMeasurementPoint('L5 / T5'),
            createComplexMeasurementPoint('L6 / T6'),
            createComplexMeasurementPoint('L7 / T7'),
        ]
    },
    {
        id: nanoid(),
        locationName: 'DOWN WIND',
        standard: '70',
        measurements: [
            createComplexMeasurementPoint('L1 / T1'),
            createComplexMeasurementPoint('L2 / T2'),
            createComplexMeasurementPoint('L3 / T3'),
            createComplexMeasurementPoint('L4 / T4'),
            createComplexMeasurementPoint('L5 / T5'),
            createComplexMeasurementPoint('L6 / T6'),
            createComplexMeasurementPoint('L7 / T7'),
        ]
    }
];

// Data untuk regulasi Permenaker 05/2018
export const noiseParamsPermenaker5 = [{
    ...defaultNoiseSimpleRow,
    standard: '85',
    unit: 'dBA',
    method: 'SNI 7231:2009',
}];

// Data untuk regulasi Kepmen LH 48/1996
export const noiseParamsKepmenLH48 = defaultNoiseComplexSetup.map(loc => ({
    ...loc,
    unit: 'dBA',
    method: 'SNI 8427:2017',
}));

// Data untuk regulasi Kepgub DKI 551/2001
export const noiseParamsKepgubDKI551 = defaultNoiseComplexSetup.map(loc => ({
    ...loc,
    unit: 'dBA',
    method: 'SNI 8427:2017',
}));
