/*
  Warnings:

  - You are about to alter the column `points` on the `Points` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Points` MODIFY `points` DOUBLE NOT NULL;
