-- CreateTable
CREATE TABLE `NonMemberHorseOwner` (
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `phoneType` ENUM('Mobile', 'Home', 'Business') NOT NULL DEFAULT 'Mobile',

    PRIMARY KEY (`fullName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `boardMember` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(25) NOT NULL,
    `state` VARCHAR(25) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `phoneType` ENUM('Mobile', 'Home', 'Business') NOT NULL DEFAULT 'Mobile',
    `email` VARCHAR(100) NOT NULL,
    `comments` VARCHAR(4000) NULL,
    `confirmed` BOOLEAN NOT NULL DEFAULT false,
    `currentUSEAMember` BOOLEAN NOT NULL DEFAULT false,
    `businessName` VARCHAR(100) NULL,
    `membershipDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `memberType` ENUM('Individual', 'Family', 'Business') NOT NULL,
    `memberStatus` ENUM('Life', 'Annual', 'Renew') NOT NULL,
    `JRSR` ENUM('JR', 'SR') NOT NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `zip` INTEGER NOT NULL,
    `useaMemberID` INTEGER NULL,

    PRIMARY KEY (`fullName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `updatedAt` DATETIME(3) NULL,
    `comments` VARCHAR(4000) NULL,
    `payee` VARCHAR(191) NOT NULL,
    `amountPaid` INTEGER NULL,
    `datePaid` DATETIME(3) NULL,
    `paymentMethod` ENUM('PayPal', 'Check') NULL,
    `checkNumber` INTEGER NULL,

    PRIMARY KEY (`payee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horse` (
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `horseRN` VARCHAR(255) NOT NULL,
    `horseAKA` VARCHAR(255) NULL,
    `notConnected` BOOLEAN NULL DEFAULT false,
    `memberName` VARCHAR(191) NULL,
    `registrationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `regType` ENUM('Life', 'Annual', 'Renew') NOT NULL,
    `owner` VARCHAR(191) NULL,

    PRIMARY KEY (`horseRN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TotalPoints` (
    `uid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `division` VARCHAR(20) NOT NULL,
    `totalPoints` DOUBLE NOT NULL DEFAULT 0,
    `totalShows` INTEGER NOT NULL DEFAULT 0,
    `completedHT` BOOLEAN NOT NULL DEFAULT false,
    `multiVenue` BOOLEAN NOT NULL DEFAULT false,
    `riderUid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TotalPoints_riderUid_key`(`riderUid`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiderCombo` (
    `uid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `memberName` VARCHAR(191) NOT NULL,
    `horseName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Show` (
    `uid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `showName` VARCHAR(150) NOT NULL,
    `showType` VARCHAR(10) NOT NULL,
    `reviewed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RiderComboToShow` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RiderComboToShow_AB_unique`(`A`, `B`),
    INDEX `_RiderComboToShow_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
