"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const c45_engine_1 = require("../lib/c45_engine");
const dataset = [];
const labels = ["NORMAL", "WASPADA", "BAHAYA"];
const model = JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), "data", "model_tree.json"), "utf-8"));
const testingPath = path_1.default.join(process.cwd(), "data", "testing_dataset.csv");
fs_1.default.createReadStream(testingPath)
    .pipe((0, csv_parser_1.default)())
    .on("data", (row) => {
    dataset.push(row);
})
    .on("end", () => {
    //--------------------------------
    // CONFUSION MATRIX
    //--------------------------------
    const matrix = {};
    for (const actual of labels) {
        matrix[actual] = {};
        for (const predicted of labels) {
            matrix[actual][predicted] = 0;
        }
    }
    //--------------------------------
    // LOOP TESTING
    //--------------------------------
    let correct = 0;
    for (const row of dataset) {
        const result = (0, c45_engine_1.predict)(model, {
            ma_suhu: Number(row.ma_suhu),
            ror_suhu: Number(row.ror_suhu),
            ma_gas: Number(row.ma_gas),
            api_mentah: Number(row.api_mentah),
        });
        const actual = row.label.trim();
        const predicted = result.status.trim();
        matrix[actual][predicted]++;
        if (actual === predicted) {
            correct++;
        }
    }
    //--------------------------------
    // ACCURACY
    //--------------------------------
    const accuracy = (correct / dataset.length) * 100;
    //--------------------------------
    // OUTPUT MATRIX
    //--------------------------------
    console.log("\n=== CONFUSION MATRIX ===");
    console.table(matrix);
    console.log(`Accuracy: ${accuracy.toFixed(2)}%\n`);
    //--------------------------------
    // PRECISION RECALL F1
    //--------------------------------
    console.log("=== METRICS ===");
    for (const label of labels) {
        const TP = matrix[label][label];
        let FP = 0;
        let FN = 0;
        for (const other of labels) {
            if (other !== label) {
                FP += matrix[other][label];
                FN += matrix[label][other];
            }
        }
        const precision = TP + FP === 0
            ? 0
            : TP / (TP + FP);
        const recall = TP + FN === 0
            ? 0
            : TP / (TP + FN);
        const f1 = precision + recall === 0
            ? 0
            : 2 *
                (precision * recall) /
                (precision + recall);
        console.log(`
${label}
Precision : ${(precision * 100).toFixed(2)}%
Recall    : ${(recall * 100).toFixed(2)}%
F1-Score  : ${(f1 * 100).toFixed(2)}%
`);
    }
});
