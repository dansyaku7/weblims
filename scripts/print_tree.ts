import fs from "fs";
import path from "path";

const modelPath = path.join(
  process.cwd(),
  "data",
  "model_tree.json"
);

const tree = JSON.parse(
  fs.readFileSync(modelPath, "utf-8")
);

function printTree(
  node: any,
  indent = ""
) {
  if (node.isLeaf) {
    console.log(
      indent + "→ " + node.label
    );
    return;
  }

  console.log(
    `${indent}IF ${node.feature} <= ${node.threshold.toFixed(3)}`
  );

  printTree(
    node.left,
    indent + "   "
  );

  console.log(
    `${indent}ELSE (${node.feature} > ${node.threshold.toFixed(3)})`
  );

  printTree(
    node.right,
    indent + "   "
  );
}

console.log("\n=== DECISION TREE STRUCTURE ===\n");

printTree(tree);