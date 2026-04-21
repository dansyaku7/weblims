import fs from "fs";
import path from "path";
import csv from "csv-parser";

import { buildTree } from "../lib/c45_engine";

const dataset: any[] = [];

const trainingPath = path.join(
  process.cwd(),
  "data",
  "training_dataset.csv"
);

fs.createReadStream(trainingPath)
  .pipe(csv())
  .on("data", (row) => {
    dataset.push({
      ma_suhu: Number(row.ma_suhu),
      ror_suhu: Number(row.ror_suhu),
      ma_gas: Number(row.ma_gas),
      api_mentah: Number(row.api_mentah),
      label: row.label,
    });
  })
  .on("end", () => {
    const tree = buildTree(dataset);

    fs.writeFileSync(
      path.join(process.cwd(), "data", "model_tree.json"),
      JSON.stringify(tree, null, 2)
    );

    console.log("MODEL BERHASIL DITRAINING");
  });