// Lokasi: app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// Konfigurasi otentikasi kamu
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Fungsi ini yang akan dijalankan saat user mencoba login
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        // Cari user di database berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: true, // Sertakan data role user
          },
        });

        // Jika user tidak ditemukan atau password salah
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Email atau password salah.");
        }

        // Jika berhasil, kembalikan data user yang akan disimpan di token
        return {
          id: user.id.toString(),
          email: user.email,
          fullName: user.fullName,
          role: user.role.name, // Ambil nama role
        };
      },
    }),
  ],
  
  // Menggunakan JSON Web Tokens (JWT) untuk sesi
  session: {
    strategy: "jwt",
  },

  // Callbacks untuk menambahkan data custom (seperti role) ke token dan sesi
  callbacks: {
    async jwt({ token, user }) {
      // Saat login pertama kali, 'user' akan ada isinya
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Kirim data dari token ke sesi, agar bisa diakses di client/server
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Secret untuk JWT, ambil dari environment variable
  secret: process.env.JWT_SECRET,

  // Halaman custom untuk login jika diperlukan
  // pages: {
  //   signIn: '/login',
  // },
};

// Export handler untuk NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };