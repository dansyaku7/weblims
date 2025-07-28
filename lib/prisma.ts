import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Perbedaan utama ada di baris ini: menggunakan 'export const'
export const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ["query"] ini bagus untuk development, jadi kita pertahankan
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Kita tidak lagi menggunakan 'export default'
