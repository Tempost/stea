/*
  Warnings:

  - You are about to drop the `TotalPoints` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RiderComboToShow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `division` to the `RiderCombo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RiderCombo` ADD COLUMN `completedHT` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `division` VARCHAR(20) NOT NULL,
    ADD COLUMN `multiVenue` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `totalPoints` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalShows` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `TotalPoints`;

-- DropTable
DROP TABLE `_RiderComboToShow`;

-- CreateTable
CREATE TABLE `Points` (
    `uid` VARCHAR(191) NOT NULL,
    `riderUid` VARCHAR(191) NOT NULL,
    `showUid` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
