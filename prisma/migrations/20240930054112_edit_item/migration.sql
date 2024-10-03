/*
  Warnings:

  - Added the required column `itemId` to the `Monters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `monters` ADD COLUMN `itemId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Monters` ADD CONSTRAINT `Monters_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
