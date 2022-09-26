/*
  Warnings:

  - Added the required column `showDate` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Show` ADD COLUMN `showDate` DATETIME(3) NOT NULL;
