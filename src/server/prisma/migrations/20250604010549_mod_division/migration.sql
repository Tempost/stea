-- AlterEnum
ALTER TYPE "Division" ADD VALUE 'Modified';

-- AlterTable
ALTER TABLE "_RiderComboToShow" ADD CONSTRAINT "_RiderComboToShow_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RiderComboToShow_AB_unique";
