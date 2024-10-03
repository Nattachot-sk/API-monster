/*
  Warnings:

  - You are about to drop the column `dropRate` on the `monters` table. All the data in the column will be lost.
  - You are about to drop the column `gold` on the `statuses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `monters` DROP COLUMN `dropRate`;

-- AlterTable
ALTER TABLE `statuses` DROP COLUMN `gold`;
