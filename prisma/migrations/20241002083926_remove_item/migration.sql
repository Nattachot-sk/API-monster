/*
  Warnings:

  - You are about to drop the column `itemId` on the `monters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `monters` DROP FOREIGN KEY `Monters_itemId_fkey`;

-- AlterTable
ALTER TABLE `monters` DROP COLUMN `itemId`;
