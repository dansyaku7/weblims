// Made by SyK
export type StatusSistem = "NORMAL" | "WARNING" | "DANGER";

export interface SensorRecord {
  api_mentah:  number;
  ma_gas:      number;
  ma_suhu:     number;
  ror_suhu:    number;
  label:       StatusSistem; 
}

export interface TreeNode {
  isLeaf:      boolean;
  label?:      StatusSistem;
  feature?:    string;
  threshold?:  number;
  gainRatio?:  number;
  entropy?:    number;
  left?:       TreeNode;
  right?:      TreeNode;
}

export interface C45Prediction {
  status:      StatusSistem;
  path:        string[];
  confidence:  number;
}

export function calculateEntropy(records: SensorRecord[]): number {
  if (records.length === 0) return 0;
  const counts: Record<string, number> = {};
  for (const r of records) { counts[r.label] = (counts[r.label] ?? 0) + 1; }
  let entropy = 0;
  for (const count of Object.values(counts)) {
    const p = count / records.length;
    if (p > 0) entropy -= p * Math.log2(p);
  }
  return entropy;
}

function splitByThreshold(records: SensorRecord[], feature: keyof Omit<SensorRecord, "label">, threshold: number): [SensorRecord[], SensorRecord[]] {
  return [
    records.filter(r => r[feature] <= threshold),
    records.filter(r => r[feature] > threshold)
  ];
}

export function calculateInfoGain(records: SensorRecord[], feature: keyof Omit<SensorRecord, "label">, threshold: number, parentEntropy: number): number {
  const [left, right] = splitByThreshold(records, feature, threshold);
  const n = records.length;
  const weightedEntropy = (left.length / n) * calculateEntropy(left) + (right.length / n) * calculateEntropy(right);
  return parentEntropy - weightedEntropy;
}

export function calculateSplitInfo(records: SensorRecord[], feature: keyof Omit<SensorRecord, "label">, threshold: number): number {
  const [left, right] = splitByThreshold(records, feature, threshold);
  const n = records.length;
  let splitInfo = 0;
  for (const subset of [left, right]) {
    if (subset.length === 0) continue;
    const p = subset.length / n;
    splitInfo -= p * Math.log2(p);
  }
  return splitInfo;
}

function findBestThreshold(records: SensorRecord[], feature: keyof Omit<SensorRecord, "label">) {
  const values = [...new Set(records.map(r => r[feature]))].sort((a, b) => a - b);
  let bestThreshold = values[0];
  let bestGainRatio = -Infinity;

  for (let i = 0; i < values.length - 1; i++) {
    const threshold = (values[i] + values[i + 1]) / 2;
    const parentEntropy = calculateEntropy(records);
    const infoGain = calculateInfoGain(records, feature, threshold, parentEntropy);
    const splitInfo = calculateSplitInfo(records, feature, threshold);
    const gainRatio = splitInfo === 0 ? 0 : infoGain / splitInfo;

    if (gainRatio > bestGainRatio) {
      bestGainRatio = gainRatio;
      bestThreshold = threshold;
    }
  }
  return { threshold: bestThreshold, gainRatio: bestGainRatio };
}

export function buildTree(records: SensorRecord[], depth = 0): TreeNode {
  if (records.length < 3 || depth >= 5) return makeLeaf(records);
  const labels = new Set(records.map(r => r.label));
  if (labels.size === 1) return { isLeaf: true, label: records[0].label };

  const features: (keyof Omit<SensorRecord, "label">)[] = ["ror_suhu", "ma_gas", "api_mentah", "ma_suhu"];
  let bestFeature: keyof Omit<SensorRecord, "label"> = "ror_suhu";
  let bestThreshold = 0;
  let bestGainRatio = -Infinity;

  for (const feature of features) {
    const result = findBestThreshold(records, feature);
    if (result.gainRatio > bestGainRatio) {
      bestGainRatio = result.gainRatio;
      bestThreshold = result.threshold;
      bestFeature = feature;
    }
  }

  if (bestGainRatio <= 0) return makeLeaf(records);
  const [left, right] = splitByThreshold(records, bestFeature, bestThreshold);
  if (left.length === 0 || right.length === 0) return makeLeaf(records);

  return {
    isLeaf: false, feature: bestFeature, threshold: bestThreshold, gainRatio: bestGainRatio,
    left: buildTree(left, depth + 1), right: buildTree(right, depth + 1),
  };
}

function makeLeaf(records: SensorRecord[]): TreeNode {
  if (records.length === 0) return { isLeaf: true, label: "NORMAL" };
  const counts: Record<string, number> = {};
  for (const r of records) { counts[r.label] = (counts[r.label] ?? 0) + 1; }
  const label = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as StatusSistem;
  return { isLeaf: true, label };
}

export function predict(node: TreeNode, input: Omit<SensorRecord, "label">): C45Prediction {
  const path: string[] = [];
  let current = node;
  while (!current.isLeaf) {
    const feature = current.feature! as keyof Omit<SensorRecord, "label">;
    const threshold = current.threshold!;
    const value = input[feature];
    path.push(`${feature}=${value.toFixed(3)} ${value <= threshold ? "≤" : ">"} ${threshold.toFixed(3)}`);
    current = value <= threshold ? current.left! : current.right!;
  }
  return { status: current.label!, path, confidence: 85 };
}

// Fallback jika database belum ada
export function autoLabel(sensor: Omit<SensorRecord, "label">): StatusSistem {
  if (sensor.ror_suhu >= 0.8 || (sensor.ma_gas >= 2500 && sensor.api_mentah <= 500)) return "DANGER";
  if (sensor.ror_suhu >= 0.3 || sensor.ma_gas >= 1500 || sensor.api_mentah <= 1500) return "WARNING";
  return "NORMAL";
}

// ============================================================
// SYNTHETIC DATASET (Data Latih Simulasi Khusus Lingkungan Lab)
// ============================================================
export const syntheticDataset: SensorRecord[] = [
  // NORMAL (RoR stabil, suhu bisa wajar bisa agak panas)
  { api_mentah: 4095, ma_gas: 120,  ma_suhu: 25.5, ror_suhu: 0.0100, label: "NORMAL" },
  { api_mentah: 4095, ma_gas: 250,  ma_suhu: 28.0, ror_suhu: 0.0200, label: "NORMAL" },
  { api_mentah: 4095, ma_gas: 380,  ma_suhu: 32.5, ror_suhu: 0.0400, label: "NORMAL" },
  { api_mentah: 4095, ma_gas: 450,  ma_suhu: 36.5, ror_suhu: 0.0300, label: "NORMAL" }, 
  { api_mentah: 4095, ma_gas: 480,  ma_suhu: 37.0, ror_suhu: 0.0100, label: "NORMAL" },

  // WARNING (Pola anomali: Gas naik drastis atau RoR melonjak meskipun suhu belum 50C)
  { api_mentah: 4095, ma_gas: 650,  ma_suhu: 30.5, ror_suhu: 0.1500, label: "WARNING" },
  { api_mentah: 4095, ma_gas: 700,  ma_suhu: 36.8, ror_suhu: 0.2000, label: "WARNING" },
  { api_mentah: 4095, ma_gas: 1200, ma_suhu: 32.0, ror_suhu: 0.0500, label: "WARNING" },
  { api_mentah: 2500, ma_gas: 400,  ma_suhu: 34.0, ror_suhu: 0.1800, label: "WARNING" },
  { api_mentah: 4095, ma_gas: 950,  ma_suhu: 39.5, ror_suhu: 0.2500, label: "WARNING" },

  // DANGER (Kondisi Kritis Mutlak)
  { api_mentah: 800,  ma_gas: 700,  ma_suhu: 42.0, ror_suhu: 0.5000, label: "DANGER" },
  { api_mentah: 4095, ma_gas: 1800, ma_suhu: 48.0, ror_suhu: 0.8500, label: "DANGER" },
  { api_mentah: 1500, ma_gas: 2200, ma_suhu: 55.0, ror_suhu: 1.2000, label: "DANGER" },
  { api_mentah: 4095, ma_gas: 300,  ma_suhu: 60.0, ror_suhu: 1.5000, label: "DANGER" },
  { api_mentah: 300,  ma_gas: 2500, ma_suhu: 58.0, ror_suhu: 1.0000, label: "DANGER" },
];