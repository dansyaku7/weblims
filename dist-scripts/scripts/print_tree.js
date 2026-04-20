"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const modelPath = path_1.default.join(process.cwd(), "data", "model_tree.json");
const tree = JSON.parse(fs_1.default.readFileSync(modelPath, "utf-8"));
function printTree(node, indent = "") {
    if (node.isLeaf) {
        console.log(indent + "→ " + node.label);
        return;
    }
    console.log(`${indent}IF ${node.feature} <= ${node.threshold.toFixed(3)}`);
    printTree(node.left, indent + "   ");
    console.log(`${indent}ELSE (${node.feature} > ${node.threshold.toFixed(3)})`);
    printTree(node.right, indent + "   ");
}
console.log("\n=== DECISION TREE STRUCTURE ===\n");
printTree(tree);
