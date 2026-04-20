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
const trainingPath = path_1.default.join(process.cwd(), "data", "training_dataset.csv");
fs_1.default.createReadStream(trainingPath)
    .pipe((0, csv_parser_1.default)())
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
    const tree = (0, c45_engine_1.buildTree)(dataset);
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), "data", "model_tree.json"), JSON.stringify(tree, null, 2));
    console.log("MODEL BERHASIL DITRAINING");
});
