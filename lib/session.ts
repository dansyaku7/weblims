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
  console.log("Mencoba mengambil sesi pengguna...");
  
  // PERBAIKAN: Gunakan await di sini
  const cookieStore = await cookies();
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
    const decoded = jwt.verify(token, secret) as UserPayload;
    console.log("SUKSES: Token berhasil diverifikasi. Payload:", decoded);
    return decoded;
  } catch (error: any) {
    console.error("GAGAL: Verifikasi token JWT error! Pesan:", error.message);
    return null;
  }
}