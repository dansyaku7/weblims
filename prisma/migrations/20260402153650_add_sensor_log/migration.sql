-- CreateTable
CREATE TABLE `SensorLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apiMentah` INTEGER NOT NULL,
    `gasMentah` INTEGER NOT NULL,
    `suhuMentah` DOUBLE NOT NULL,
    `maGas` INTEGER NOT NULL,
    `maSuhu` DOUBLE NOT NULL,
    `rorSuhu` DOUBLE NOT NULL,
    `statusSistem` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
