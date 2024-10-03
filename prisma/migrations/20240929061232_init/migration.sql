-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `players_username_key`(`username`),
    UNIQUE INDEX `players_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `health` INTEGER NOT NULL DEFAULT 100,
    `mana` INTEGER NOT NULL DEFAULT 50,
    `gold` INTEGER NOT NULL DEFAULT 0,
    `attack` INTEGER NOT NULL DEFAULT 3,
    `armor` INTEGER NOT NULL DEFAULT 3,
    `critical` INTEGER NOT NULL DEFAULT 1,
    `rank` ENUM('S', 'A', 'B', 'C', 'D', 'E') NOT NULL DEFAULT 'E',

    UNIQUE INDEX `statuses_playerId_key`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Monster` (
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

-- CreateTable
CREATE TABLE `RankMonter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `statuses` ADD CONSTRAINT `statuses_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventories` ADD CONSTRAINT `inventories_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Monster` ADD CONSTRAINT `Monster_rankmonterId_fkey` FOREIGN KEY (`rankmonterId`) REFERENCES `RankMonter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
