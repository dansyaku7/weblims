"use strict";
// File: lib/session.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromSession = getUserFromSession;
const headers_1 = require("next/headers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function getUserFromSession() {
    console.log("Mencoba mengambil sesi pengguna...");
    // PERBAIKAN: Gunakan await di sini
    const cookieStore = await (0, headers_1.cookies)();
    const tokenCookie = cookieStore.get('auth-token');
    if (!tokenCookie) {
        console.log("GAGAL: Cookie 'auth-token' tidak ditemukan.");
        return null;
    }
    console.log("INFO: Cookie 'auth-token' ditemukan.");
    const token = tokenCookie.value;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("FATAL: JWT_SECRET tidak ada di environment variables!");
        return null;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log("SUKSES: Token berhasil diverifikasi. Payload:", decoded);
        return decoded;
    }
    catch (error) {
        console.error("GAGAL: Verifikasi token JWT error! Pesan:", error.message);
        return null;
    }
}
