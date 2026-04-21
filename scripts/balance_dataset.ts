import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function generateBalancedDataset() {
  console.log("Membaca seluruh data dari Database...");
  const allLogs = await prisma.sensorLog.findMany();

  let normal = allLogs.filter(l => l.statusSistem === "NORMAL");
  let waspada = allLogs.filter(l => l.statusSistem === "WASPADA");
  let bahaya = allLogs.filter(l => l.statusSistem === "BAHAYA");

  console.log(`Data mentah di DB: NORMAL(${normal.length}), WASPADA(${waspada.length}), BAHAYA(${bahaya.length})`);

  const minCount = Math.min(normal.length, waspada.length, bahaya.length);
  const targetLimit = minCount > 150 ? 150 : minCount;

  if (targetLimit < 10) {
    console.log("⚠️ Peringatan: Data di DB masih terlalu sedikit untuk di-balance secara optimal!");
  }

  normal = shuffleArray(normal).slice(0, targetLimit);
  waspada = shuffleArray(waspada).slice(0, targetLimit);
  bahaya = shuffleArray(bahaya).slice(0, targetLimit);

  let balancedData = shuffleArray([...normal, ...waspada, ...bahaya]);

  const splitIndex = Math.floor(balancedData.length * 0.8);
  const trainingData = balancedData.slice(0, splitIndex);
  const testingData = balancedData.slice(splitIndex);

  const writeToCSV = (filename: string, dataObj: typeof trainingData) => {
    let csv = "api_mentah,ma_gas,ma_suhu,ror_suhu,label\n";
    dataObj.forEach(log => {
      csv += `${log.apiMentah},${log.maGas},${log.maSuhu},${log.rorSuhu},${log.statusSistem}\n`;
    });
    fs.writeFileSync(path.join(process.cwd(), 'data', filename), csv);
  };

  writeToCSV('training_dataset.csv', trainingData);
  writeToCSV('testing_dataset.csv', testingData);

  console.log(`\n✅ Dataset berhasil digenerate! Target data per kelas: ${targetLimit}`);
  console.log(`📁 data/training_dataset.csv -> ${trainingData.length} baris`);
  console.log(`📁 data/testing_dataset.csv  -> ${testingData.length} baris`);
}

generateBalancedDataset().catch(e => console.error(e)).finally(() => prisma.$disconnect());