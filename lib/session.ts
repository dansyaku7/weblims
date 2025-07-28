// File: lib/session.ts

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Definisikan tipe untuk payload token agar lebih aman
interface UserPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export async function getUserFromSession(): Promise<UserPayload | null> {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('auth-token');

  if (!tokenCookie) {
    return null;
  }

  const token = tokenCookie.value;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
      console.error("JWT_SECRET belum diatur di .env.local!");
      return null;
  }

  try {
    // Verifikasi token dan kembalikan datanya
    const decoded = jwt.verify(token, secret) as UserPayload;
    return decoded;
  } catch (error) {
    console.error("Gagal verifikasi token:", error);
    return null;
  }
}