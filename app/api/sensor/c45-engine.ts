// Made by SyK
// ============================================================
// C4.5 DECISION TREE ENGINE — Full Implementation
// Entropy, Information Gain, Split Info, Gain Ratio
// Untuk sistem monitoring IoT deteksi kebakaran
// ============================================================

export type StatusSistem = "NORMAL" | "WARNING" | "DANGER";

export interface SensorRecord {
  api_mentah:  number;
  ma_gas:      number;
  ma_suhu:     number;
  ror_suhu:    number;
  label:       StatusSistem; // ground truth — ditentukan saat data masuk
}

// ── Node pohon hasil training ──
export interface TreeNode {
  isLeaf:      boolean;
  label?:      StatusSistem;       // jika leaf
  feature?:    string;             // fitur split
  threshold?:  number;             // nilai split (untuk fitur kontinu)
  gainRatio?:  number;             // gain ratio saat split ini dipilih
  entropy?:    number;             // entropy dataset di node ini
  left?:       TreeNode;           // nilai ≤ threshold
  right?:      TreeNode;           // nilai > threshold
}

// ── Hasil prediksi ──
export interface C45Prediction {
  status:      StatusSistem;
  path:        string[];
  confidence:  number;
}

// ── Hasil analisis fitur (untuk transparansi) ──
export interface FeatureAnalysis {
  feature:      string;
  entropy:      number;
  infoGain:     number;
  splitInfo:    number;
  gainRatio:    number;
}

// ============================================================
// 1. ENTROPY
// H(S) = -Σ p(c) * log2(p(c))
// ============================================================
export function calculateEntropy(records: SensorRecord[]): number {
  if (records.length === 0) return 0;

  const counts: Record<string, number> = {};
  for (const r of records) {
    counts[r.label] = (counts[r.label] ?? 0) + 1;
  }

  let entropy = 0;
  for (const count of Object.values(counts)) {
    const p = count / records.length;
    if (p > 0) entropy -= p * Math.log2(p);
  }
  return entropy;
}

// ============================================================
// 2. SPLIT DATA berdasarkan threshold
// ============================================================
function splitByThreshold(
  records: SensorRecord[],
  feature: keyof Omit<SensorRecord, "label">,
  threshold: number
): [SensorRecord[], SensorRecord[]] {
  const left  = records.filter(r => r[feature] <= threshold);
  const right = records.filter(r => r[feature] >  threshold);
  return [left, right];
}

// ============================================================
// 3. INFORMATION GAIN
// ============================================================
export function calculateInfoGain(
  records: SensorRecord[],
  feature: keyof Omit<SensorRecord, "label">,
  threshold: number,
  parentEntropy: number
): number {
  const [left, right] = splitByThreshold(records, feature, threshold);
  const n = records.length;

  const weightedEntropy =
    (left.length  / n) * calculateEntropy(left) +
    (right.length / n) * calculateEntropy(right);

  return parentEntropy - weightedEntropy;
}

// ============================================================
// 4. SPLIT INFORMATION
// ============================================================
export function calculateSplitInfo(
  records: SensorRecord[],
  feature: keyof Omit<SensorRecord, "label">,
  threshold: number
): number {
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

// ============================================================
// 5. GAIN RATIO (inti C4.5)
// ============================================================
export function calculateGainRatio(
  records: SensorRecord[],
  feature: keyof Omit<SensorRecord, "label">,
  threshold: number
): number {
  const parentEntropy = calculateEntropy(records);
  const infoGain  = calculateInfoGain(records, feature, threshold, parentEntropy);
  const splitInfo = calculateSplitInfo(records, feature, threshold);

  if (splitInfo === 0) return 0;
  return infoGain / splitInfo;
}

// ============================================================
// 6. CARI THRESHOLD TERBAIK
// ============================================================
function findBestThreshold(
  records: SensorRecord[],
  feature: keyof Omit<SensorRecord, "label">
): { threshold: number; gainRatio: number; infoGain: number; splitInfo: number } {
  const values = [...new Set(records.map(r => r[feature]))].sort((a, b) => a - b);
  
  let bestThreshold = values[0];
  let bestGainRatio = -Infinity;
  let bestInfoGain  = 0;
  let bestSplitInfo = 0;

  for (let i = 0; i < values.length - 1; i++) {
    const threshold = (values[i] + values[i + 1]) / 2;
    
    const parentEntropy = calculateEntropy(records);
    const infoGain  = calculateInfoGain(records, feature, threshold, parentEntropy);
    const splitInfo = calculateSplitInfo(records, feature, threshold);
    const gainRatio = splitInfo === 0 ? 0 : infoGain / splitInfo;

    if (gainRatio > bestGainRatio) {
      bestGainRatio = gainRatio;
      bestThreshold = threshold;
      bestInfoGain  = infoGain;
      bestSplitInfo = splitInfo;
    }
  }

  return {
    threshold: bestThreshold,
    gainRatio: bestGainRatio,
    infoGain:  bestInfoGain,
    splitInfo: bestSplitInfo,
  };
}

// ============================================================
// 7. ANALISIS SEMUA FITUR
// ============================================================
export function analyzeAllFeatures(records: SensorRecord[]): FeatureAnalysis[] {
  const features: (keyof Omit<SensorRecord, "label">)[] = [
    "ror_suhu", "ma_gas", "api_mentah", "ma_suhu"
  ];
  const parentEntropy = calculateEntropy(records);
  const results: FeatureAnalysis[] = [];

  for (const feature of features) {
    const best = findBestThreshold(records, feature);
    results.push({
      feature,
      entropy:   parentEntropy,
      infoGain:  best.infoGain,
      splitInfo: best.splitInfo,
      gainRatio: best.gainRatio,
    });
  }

  return results.sort((a, b) => b.gainRatio - a.gainRatio);
}

// ============================================================
// 8. BANGUN DECISION TREE
// ============================================================
const MAX_DEPTH    = 5;
const MIN_SAMPLES  = 3; 

export function buildTree(
  records: SensorRecord[],
  depth = 0
): TreeNode {
  if (records.length < MIN_SAMPLES || depth >= MAX_DEPTH) {
    return makeLeaf(records);
  }

  const labels = new Set(records.map(r => r.label));
  if (labels.size === 1) {
    return { isLeaf: true, label: records[0].label };
  }

  const features: (keyof Omit<SensorRecord, "label">)[] = [
    "ror_suhu", "ma_gas", "api_mentah", "ma_suhu"
  ];

  let bestFeature:   keyof Omit<SensorRecord, "label"> = "ror_suhu";
  let bestThreshold  = 0;
  let bestGainRatio  = -Infinity;

  for (const feature of features) {
    const result = findBestThreshold(records, feature);
    if (result.gainRatio > bestGainRatio) {
      bestGainRatio  = result.gainRatio;
      bestThreshold  = result.threshold;
      bestFeature    = feature;
    }
  }

  if (bestGainRatio <= 0) {
    return makeLeaf(records);
  }

  const [left, right] = splitByThreshold(records, bestFeature, bestThreshold);

  if (left.length === 0 || right.length === 0) {
    return makeLeaf(records);
  }

  return {
    isLeaf:    false,
    feature:   bestFeature,
    threshold: bestThreshold,
    gainRatio: bestGainRatio,
    entropy:   calculateEntropy(records),
    left:      buildTree(left,  depth + 1),
    right:     buildTree(right, depth + 1),
  };
}

function makeLeaf(records: SensorRecord[]): TreeNode {
  if (records.length === 0) return { isLeaf: true, label: "NORMAL" };

  const counts: Record<string, number> = {};
  for (const r of records) {
    counts[r.label] = (counts[r.label] ?? 0) + 1;
  }
  const label = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as StatusSistem;
  return { isLeaf: true, label };
}

// ============================================================
// 9. PREDIKSI
// ============================================================
export function predict(
  node: TreeNode,
  input: Omit<SensorRecord, "label">
): C45Prediction {
  const path: string[] = [];
  let current = node;

  while (!current.isLeaf) {
    const feature   = current.feature! as keyof Omit<SensorRecord, "label">;
    const threshold = current.threshold!;
    const value     = input[feature];

    path.push(
      `${feature}=${value.toFixed(3)} ${value <= threshold ? "≤" : ">"} ${threshold.toFixed(3)}`
    );

    current = value <= threshold ? current.left! : current.right!;
  }

  path.push(`→ ${current.label}`);

  return {
    status:     current.label!,
    path,
    confidence: 85,
  };
}

// ============================================================
// 10. AUTO-LABELING
// ============================================================
export function autoLabel(sensor: Omit<SensorRecord, "label">): StatusSistem {
  if (sensor.ror_suhu >= 0.8 || (sensor.ma_gas >= 2500 && sensor.api_mentah <= 500)) {
    return "DANGER";
  }
  if (sensor.ror_suhu >= 0.3 || sensor.ma_gas >= 1500 || sensor.api_mentah <= 1500) {
    return "WARNING";
  }
  return "NORMAL";
}