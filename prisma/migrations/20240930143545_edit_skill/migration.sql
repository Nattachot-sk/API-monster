/*
  Warnings:

  - You are about to drop the column `palyerId` on the `skills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skillId]` on the table `players` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `skillId` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `skills` DROP FOREIGN KEY `skills_palyerId_fkey`;

-- AlterTable
ALTER TABLE `players` ADD COLUMN `skillId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `skills` DROP COLUMN `palyerId`;

-- CreateIndex
CREATE UNIQUE INDEX `players_skillId_key` ON `players`(`skillId`);

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
