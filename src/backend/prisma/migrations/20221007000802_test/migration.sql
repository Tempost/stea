/*
  Warnings:

  - The values [AA,Open,JR] on the enum `Member_memberStatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `memberStatusType` ENUM('AdultAmature', 'Professional', 'Junior') NOT NULL;
