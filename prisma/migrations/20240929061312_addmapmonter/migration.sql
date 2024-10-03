/*
  Warnings:

  - You are about to drop the `monster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `monster` DROP FOREIGN KEY `Monster_rankmonterId_fkey`;

-- DropTable
DROP TABLE `monster`;

-- CreateTable
CREATE TABLE `Monters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `health` INTEGER NOT NULL,
    `attack` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `experience` INTEGER NOT NULL,
    `dropRate` DOUBLE NOT NULL,
    `rankmonterId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Monters` ADD CONSTRAINT `Monters_rankmonterId_fkey` FOREIGN KEY (`rankmonterId`) REFERENCES `RankMonter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
