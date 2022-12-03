/*
  Warnings:

  - The values [Renew] on the enum `Horse_regType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `JRSR` on the `Member` table. All the data in the column will be lost.
  - The values [Renew] on the enum `Member_memberStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `memberStatusType` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Horse` MODIFY `regType` ENUM('Life', 'Annual') NOT NULL;

-- AlterTable
ALTER TABLE `Member` DROP COLUMN `JRSR`,
    ADD COLUMN `memberStatusType` ENUM('AA', 'Open', 'JR') NOT NULL,
    MODIFY `memberStatus` ENUM('Life', 'Annual') NOT NULL;
