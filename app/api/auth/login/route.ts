import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // --- PERUBAHAN DI BARIS INI ---
    // Menggunakan NEXTAUTH_SECRET yang sudah kita standarkan
    const token = jwt.sign(
      { userId: user.id, role: user.role.name },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "1d" }
    );
    // -----------------------------

    return NextResponse.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}