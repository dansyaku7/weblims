/*
  Warnings:

  - You are about to drop the column `apiMentah` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `gasMentah` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `maGas` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `maSuhu` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `rorSuhu` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `suhuMentah` on the `SensorLog` table. All the data in the column will be lost.
  - Added the required column `co2` to the `SensorLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `o2` to the `SensorLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SensorLog` DROP COLUMN `apiMentah`,
    DROP COLUMN `gasMentah`,
    DROP COLUMN `maGas`,
    DROP COLUMN `maSuhu`,
    DROP COLUMN `rorSuhu`,
    DROP COLUMN `suhuMentah`,
    ADD COLUMN `co2` DOUBLE NOT NULL,
    ADD COLUMN `o2` DOUBLE NOT NULL;
