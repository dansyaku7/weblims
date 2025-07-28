// File: lib/session.ts

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export async function getUserFromSession(): Promise<UserPayload | null> {
  // Log 1: Memulai fungsi
  console.log("Mencoba mengambil sesi pengguna...");
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('auth-token');

  if (!tokenCookie) {
    // Log 2: Gagal karena cookie tidak ditemukan
    console.log("GAGAL: Cookie 'auth-token' tidak ditemukan.");
    return null;
  }

  // Log 3: Berhasil menemukan cookie
  console.log("INFO: Cookie 'auth-token' ditemukan.");
  const token = tokenCookie.value;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
      // Log 4: Gagal karena secret tidak ada
      console.error("FATAL: JWT_SECRET tidak ada di environment variables!");
      return null;
  }

  try {
    const decoded = jwt.verify(token, secret) as UserPayload;
    // Log 5: Berhasil verifikasi token
    console.log("SUKSES: Token berhasil diverifikasi. Payload:", decoded);
    return decoded;
  } catch (error: any) {
    // Log 6: Gagal karena verifikasi error (secret salah, token invalid, dll)
    console.error("GAGAL: Verifikasi token JWT error! Pesan:", error.message);
    return null;
  }
}