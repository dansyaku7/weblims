//code sebelumnya
// import fs from "fs";
// import path from "path";
// import csv from "csv-parser";

// import { predict } from "../lib/c45_engine";

// const dataset: any[] = [];

// const model = JSON.parse(
//   fs.readFileSync(
//     path.join(process.cwd(), "data", "model_tree.json"),
//     "utf-8"
//   )
// );

// const testingPath = path.join(
//   process.cwd(),
//   "data",
//   "testing_dataset.csv"
// );

// fs.createReadStream(testingPath)
//   .pipe(csv())
//   .on("data", (row) => {
//     dataset.push(row);
//   })
//   .on("end", () => {
//     let correct = 0;

//     for (const row of dataset) {
//       const result = predict(model, {
//         ma_suhu: Number(row.ma_suhu),
//         ror_suhu: Number(row.ror_suhu),
//         ma_gas: Number(row.ma_gas),
//         api_mentah: Number(row.api_mentah),
//       });

//       if (result.status === row.label) {
//         correct++;
//       }
//     }

//     const accuracy = (correct / dataset.length) * 100;

//     console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
//   });

// code setelahnya
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import { predict } from "../lib/c45_engine";

const dataset: any[] = [];

const model = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "data", "model_tree.json"),
    "utf-8"
  )
);

const testingPath = path.join(
  process.cwd(),
  "data",
  "testing_dataset.csv"
);

fs.createReadStream(testingPath)
  .pipe(csv())

  .on("data", (row) => {
  console.log(row);

  const cleanedRow: any = {};

  for (const key in row) {
    cleanedRow[key.trim()] = row[key];
  }
    
    dataset.push({
      ma_suhu: Number(cleanedRow.ma_suhu),
      ror_suhu: Number(cleanedRow.ror_suhu),
      ma_gas: Number(cleanedRow.ma_gas),
      api_mentah: Number(cleanedRow.api_mentah),
      label: cleanedRow.label?.trim().toUpperCase(),
    });
  })

  .on("end", () => {
    let correct = 0;

    for (const row of dataset) {

      const result = predict(model, {
        ma_suhu: row.ma_suhu,
        ror_suhu: row.ror_suhu,
        ma_gas: row.ma_gas,
        api_mentah: row.api_mentah,
      });

      console.log(
        `Actual: ${row.label} | Predicted: ${result.status}`
      );

      if (result.status === row.label) {
        correct++;
      }
    }

    const accuracy =
      (correct / dataset.length) * 100;

    console.log(
      `Accuracy: ${accuracy.toFixed(2)}%`
    );
  });