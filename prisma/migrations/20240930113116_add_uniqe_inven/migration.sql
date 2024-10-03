/*
  Warnings:

  - A unique constraint covering the columns `[playerId,itemId]` on the table `inventories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `inventories_playerId_itemId_key` ON `inventories`(`playerId`, `itemId`);
