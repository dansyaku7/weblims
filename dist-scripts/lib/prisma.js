"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
console.log("Memulai inisialisasi file lib/prisma.ts");
// Inisialisasi client
const prisma = global.prisma || new client_1.PrismaClient({
    log: ["warn", "error"], // Fokus pada log error di production
});
console.log("Instance PrismaClient telah dibuat atau diambil dari cache global.");
if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
    console.log("Mode development: Prisma client di-cache.");
}
// Pengecekan kritis untuk debugging
if (!prisma) {
    console.error("FATAL: Inisialisasi PrismaClient GAGAL. Variabel prisma bernilai undefined.");
}
else {
    console.log("Inisialisasi PrismaClient berhasil dan siap digunakan.");
}
exports.default = prisma;
