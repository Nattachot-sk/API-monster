/*
  Warnings:

  - You are about to drop the column `rankmonterId` on the `monters` table. All the data in the column will be lost.
  - You are about to drop the `rankmonter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rankmonsterId` to the `Monters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `monters` DROP FOREIGN KEY `Monters_rankmonterId_fkey`;

-- AlterTable
ALTER TABLE `monters` DROP COLUMN `rankmonterId`,
    ADD COLUMN `rankmonsterId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `rankmonter`;

-- CreateTable
CREATE TABLE `RankMonsters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Monters` ADD CONSTRAINT `Monters_rankmonsterId_fkey` FOREIGN KEY (`rankmonsterId`) REFERENCES `RankMonsters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
