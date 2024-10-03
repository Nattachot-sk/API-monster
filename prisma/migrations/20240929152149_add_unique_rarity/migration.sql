/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Rarity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Rarity_name_key` ON `Rarity`(`name`);
