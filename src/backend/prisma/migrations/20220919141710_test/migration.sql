-- CreateTable
CREATE TABLE `_RiderComboToShow` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RiderComboToShow_AB_unique`(`A`, `B`),
    INDEX `_RiderComboToShow_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
