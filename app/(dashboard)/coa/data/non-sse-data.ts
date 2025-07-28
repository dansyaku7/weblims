// data/non-sse-data.ts
import { nanoid } from 'nanoid';

// Nilai default untuk informasi sampel umum
export const defaultNonSSESampleInfo = {
  sampleNo: '', // Ditambahkan
  samplingLocation: '', // Ditambahkan
  samplingTime: '', // Ditambahkan
  notes: '** Ministry of Environment of republic Indonesia Regulation No. 05/2006',
};

// Nilai default untuk satu baris/kendaraan baru
export const defaultNonSSERow = {
  id: nanoid(),
  location: '',
  fuel: 'Diesel', // 'Diesel' atau 'Gasoline'
  year: '',
  vehicleBrand: '',
  capacity: '',
  parameter: 'Opacity', // 'Opacity' atau 'CO'
  testingResult: '',
  standard: '70', // Standar default untuk Opacity > 2010
  unit: '%', // '%' atau '% Vol'
  method: 'SNI 09-7118-2005',
  isVisible: true,
};
