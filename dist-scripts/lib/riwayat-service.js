"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRiwayat = getAllRiwayat;
const prisma_1 = __importDefault(require("@/lib/prisma"));
/**
 * Mengambil semua data riwayat dari database, diurutkan dari yang terbaru.
 */
async function getAllRiwayat() {
    try {
        const riwayatItems = await prisma_1.default.riwayat.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return { success: true, data: riwayatItems };
    }
    catch (error) {
        console.error("Error fetching riwayat from service:", error);
        return { success: false, error: "Gagal mengambil data riwayat dari database." };
    }
}
