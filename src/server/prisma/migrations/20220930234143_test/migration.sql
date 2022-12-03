/*
  Warnings:

  - You are about to alter the column `showType` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Enum("Show_showType")`.

*/
-- AlterTable
ALTER TABLE `Show` MODIFY `showType` ENUM('CT', 'HT', 'Derby') NOT NULL;
