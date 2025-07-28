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

        // Pengecekan 1: Pastikan user ditemukan
        if (!user) {
          throw new Error("Email atau password salah.");
        }

        // Pengecekan 2: Pastikan user punya password di database
        if (!user.password) {
          // Ini mencegah bcrypt error jika password null
          throw new Error("Akun ini tidak memiliki password.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Email atau password salah.");
        }
        
        // Pengecekan 3: Pastikan user punya role yang valid
        if (!user.role || !user.role.name) {
            throw new Error("Akun ini tidak memiliki role yang valid.");
        }

        // Jika semua aman, kembalikan data user
        return {
          id: user.id.toString(),
          email: user.email,
          fullName: user.fullName,
          role: user.role.name,
        };
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Export handler untuk NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };