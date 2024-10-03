/*
  Warnings:

  - You are about to drop the column `rankmonsterId` on the `monters` table. All the data in the column will be lost.
  - You are about to drop the `rankmonsters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `monters` DROP FOREIGN KEY `Monters_rankmonsterId_fkey`;

-- AlterTable
ALTER TABLE `monters` DROP COLUMN `rankmonsterId`;

-- DropTable
DROP TABLE `rankmonsters`;
