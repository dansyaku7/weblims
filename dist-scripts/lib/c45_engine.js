"use strict";
// ============================================================
// C4.5 DECISION TREE ENGINE — FULL IMPROVED IMPLEMENTATION
// Untuk Sistem Monitoring IoT Deteksi Kebakaran
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEntropy = calculateEntropy;
exports.calculateInfoGain = calculateInfoGain;
exports.calculateSplitInfo = calculateSplitInfo;
exports.calculateGainRatio = calculateGainRatio;
exports.analyzeAllFeatures = analyzeAllFeatures;
exports.buildTree = buildTree;
exports.predict = predict;
exports.autoLabel = autoLabel;
// ============================================================
// CONFIG
// ============================================================
const MAX_DEPTH = 10; // Kasih izin pohonnya tumbuh lebih tinggi
const MIN_SAMPLES = 1; // Paksa AI mikir walaupun datanya sisa 1
// ============================================================
// 1. CALCULATE ENTROPY
// ============================================================
function calculateEntropy(records) {
    if (records.length === 0)
        return 0;
    const counts = {};
    for (const r of records) {
        counts[r.label] = (counts[r.label] ?? 0) + 1;
    }
    let entropy = 0;
    for (const count of Object.values(counts)) {
        const p = count / records.length;
        if (p > 0) {
            entropy -= p * Math.log2(p);
        }
    }
    return entropy;
}
// ============================================================
// 2. SPLIT DATA BY THRESHOLD
// ============================================================
function splitByThreshold(records, feature, threshold) {
    return [
        records.filter(r => r[feature] <= threshold),
        records.filter(r => r[feature] > threshold),
    ];
}
// ============================================================
// 3. INFORMATION GAIN
// ============================================================
function calculateInfoGain(records, feature, threshold, parentEntropy) {
    const [left, right] = splitByThreshold(records, feature, threshold);
    const weightedEntropy = (left.length / records.length) * calculateEntropy(left) +
        (right.length / records.length) * calculateEntropy(right);
    return parentEntropy - weightedEntropy;
}
// ============================================================
// 4. SPLIT INFO
// ============================================================
function calculateSplitInfo(records, feature, threshold) {
    const [left, right] = splitByThreshold(records, feature, threshold);
    let splitInfo = 0;
    for (const subset of [left, right]) {
        if (subset.length === 0)
            continue;
        const p = subset.length / records.length;
        splitInfo -= p * Math.log2(p);
    }
    return splitInfo;
}
// ============================================================
// 5. GAIN RATIO
// ============================================================
function calculateGainRatio(records, feature, threshold) {
    const parentEntropy = calculateEntropy(records);
    const infoGain = calculateInfoGain(records, feature, threshold, parentEntropy);
    const splitInfo = calculateSplitInfo(records, feature, threshold);
    if (splitInfo === 0)
        return 0;
    return infoGain / splitInfo;
}
// ============================================================
// 6. FIND BEST THRESHOLD
// ============================================================
function findBestThreshold(records, feature) {
    const values = [...new Set(records.map(r => r[feature]))]
        .sort((a, b) => a - b);
    const parentEntropy = calculateEntropy(records);
    let best = {
        threshold: values[0],
        infoGain: -Infinity,
        splitInfo: 0,
        gainRatio: -Infinity,
    };
    for (let i = 0; i < values.length - 1; i++) {
        const threshold = (values[i] + values[i + 1]) / 2;
        const infoGain = calculateInfoGain(records, feature, threshold, parentEntropy);
        const splitInfo = calculateSplitInfo(records, feature, threshold);
        const gainRatio = splitInfo === 0
            ? 0
            : infoGain / splitInfo;
        if (gainRatio > best.gainRatio) {
            best = {
                threshold,
                infoGain,
                splitInfo,
                gainRatio,
            };
        }
    }
    return best;
}
// ============================================================
// 7. ANALYZE ALL FEATURES
// ============================================================
function analyzeAllFeatures(records) {
    const features = [
        "ror_suhu",
        "ma_gas",
        "api_mentah",
        "ma_suhu",
    ];
    const parentEntropy = calculateEntropy(records);
    const results = [];
    for (const feature of features) {
        const best = findBestThreshold(records, feature);
        results.push({
            feature,
            entropy: parentEntropy,
            infoGain: best.infoGain,
            splitInfo: best.splitInfo,
            gainRatio: best.gainRatio,
        });
    }
    return results.sort((a, b) => b.gainRatio - a.gainRatio);
}
// ============================================================
// 8. BUILD TREE
// ============================================================
function buildTree(records, depth = 0) {
    if (records.length < MIN_SAMPLES ||
        depth >= MAX_DEPTH) {
        return makeLeaf(records);
    }
    const uniqueLabels = new Set(records.map(r => r.label));
    if (uniqueLabels.size === 1) {
        return makeLeaf(records);
    }
    const features = [
        "ror_suhu",
        "ma_gas",
        "api_mentah",
        "ma_suhu",
    ];
    const analyses = features.map(feature => ({
        feature,
        ...findBestThreshold(records, feature),
    }));
    // ===== Average Gain Filter =====
    const avgGain = analyses.reduce((sum, a) => sum + a.infoGain, 0) / analyses.length;
    const candidates = analyses.filter(a => a.infoGain >= avgGain);
    const best = candidates.sort((a, b) => b.gainRatio - a.gainRatio)[0];
    if (!best || best.gainRatio <= 0) {
        return makeLeaf(records);
    }
    const [left, right] = splitByThreshold(records, best.feature, best.threshold);
    if (left.length === 0 ||
        right.length === 0) {
        return makeLeaf(records);
    }
    return {
        isLeaf: false,
        feature: best.feature,
        threshold: best.threshold,
        gainRatio: best.gainRatio,
        entropy: calculateEntropy(records),
        left: buildTree(left, depth + 1),
        right: buildTree(right, depth + 1),
    };
}
// ============================================================
// 9. MAKE LEAF
// ============================================================
function makeLeaf(records) {
    if (records.length === 0) {
        return {
            isLeaf: true,
            label: "NORMAL",
        };
    }
    const counts = {};
    for (const r of records) {
        counts[r.label] =
            (counts[r.label] ?? 0) + 1;
    }
    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1]);
    return {
        isLeaf: true,
        label: sorted[0][0],
        sampleCount: records.length,
        labelCounts: counts,
    };
}
// ============================================================
// 10. PREDICT
// ============================================================
function predict(node, input) {
    const path = [];
    let current = node;
    while (!current.isLeaf) {
        const feature = current.feature;
        const threshold = current.threshold;
        const value = input[feature];
        path.push(`${feature}=${value.toFixed(2)} ${value <= threshold ? "≤" : ">"} ${threshold.toFixed(2)}`);
        current =
            value <= threshold
                ? current.left
                : current.right;
    }
    const majorityCount = Math.max(...Object.values(current.labelCounts));
    const confidence = (majorityCount /
        current.sampleCount) * 100;
    path.push(`→ ${current.label}`);
    return {
        status: current.label,
        path,
        confidence: Number(confidence.toFixed(2)),
    };
}
// ============================================================
// 11. AUTO LABEL
// ============================================================
function autoLabel(sensor) {
    if (sensor.ror_suhu >= 0.8 ||
        (sensor.ma_gas >= 2500 &&
            sensor.api_mentah <= 500)) {
        return "BAHAYA";
    }
    if (sensor.ror_suhu >= 0.3 ||
        sensor.ma_gas >= 1500 ||
        sensor.api_mentah <= 1500) {
        return "WASPADA";
    }
    return "NORMAL";
}
