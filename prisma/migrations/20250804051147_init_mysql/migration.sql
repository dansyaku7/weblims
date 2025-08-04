-- CreateTable
CREATE TABLE `Riwayat` (
    `id` VARCHAR(191) NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `nomor` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `dataForm` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Riwayat_nomor_key`(`nomor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fpps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomorFpps` VARCHAR(191) NOT NULL,
    `nomorQuotation` VARCHAR(191) NULL,
    `petugas` JSON NOT NULL,
    `namaPelanggan` VARCHAR(191) NULL,
    `alamatPelanggan` VARCHAR(191) NULL,
    `noTelp` VARCHAR(191) NULL,
    `tanggalMasuk` VARCHAR(191) NULL,
    `kegiatan` VARCHAR(191) NULL,
    `namaPpic` VARCHAR(191) NULL,
    `emailPpic` VARCHAR(191) NULL,
    `status` ENUM('pendaftaran', 'penyuratan', 'sampling', 'analisis', 'sertifikat', 'selesai') NOT NULL DEFAULT 'pendaftaran',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Fpps_nomorFpps_key`(`nomorFpps`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rincian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRincian` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NULL,
    `matriks` VARCHAR(191) NULL,
    `parameter` VARCHAR(191) NULL,
    `regulasi` VARCHAR(191) NULL,
    `metode` VARCHAR(191) NULL,
    `fppsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `coverData` JSON NOT NULL,
    `activeTemplates` JSON NOT NULL,
    `status` ENUM('pendaftaran', 'penyuratan', 'sampling', 'analisis', 'sertifikat', 'selesai') NOT NULL DEFAULT 'pendaftaran',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiwayatDokumen` (
    `id` VARCHAR(191) NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `nomor` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `dataForm` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RiwayatDokumen_nomor_key`(`nomor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rincian` ADD CONSTRAINT `Rincian_fppsId_fkey` FOREIGN KEY (`fppsId`) REFERENCES `Fpps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
