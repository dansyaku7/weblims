-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendaftaran', 'penyuratan', 'sampling', 'analisis', 'sertifikat', 'selesai');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fpps" (
    "id" SERIAL NOT NULL,
    "nomorFpps" TEXT NOT NULL,
    "nomorQuotation" TEXT,
    "petugas" JSONB NOT NULL,
    "namaPelanggan" TEXT,
    "alamatPelanggan" TEXT,
    "noTelp" TEXT,
    "tanggalMasuk" TEXT,
    "kegiatan" TEXT,
    "namaPpic" TEXT,
    "emailPpic" TEXT,
    "status" "Status" NOT NULL DEFAULT 'pendaftaran',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fpps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rincian" (
    "id" SERIAL NOT NULL,
    "idRincian" TEXT NOT NULL,
    "area" TEXT,
    "matriks" TEXT,
    "parameter" TEXT,
    "regulasi" TEXT,
    "metode" TEXT,
    "fppsId" INTEGER NOT NULL,

    CONSTRAINT "Rincian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "coverData" JSONB NOT NULL,
    "activeTemplates" JSONB NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendaftaran',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fpps_nomorFpps_key" ON "Fpps"("nomorFpps");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rincian" ADD CONSTRAINT "Rincian_fppsId_fkey" FOREIGN KEY ("fppsId") REFERENCES "Fpps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
