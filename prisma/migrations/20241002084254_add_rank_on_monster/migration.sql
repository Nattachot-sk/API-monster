/*
  Warnings:

  - Added the required column `rank` to the `Monters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `monters` ADD COLUMN `rank` VARCHAR(191) NOT NULL;
