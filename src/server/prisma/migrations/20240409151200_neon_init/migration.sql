-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Life', 'Annual');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('Adult Amateur', 'Professional', 'Junior');

-- CreateEnum
CREATE TYPE "ShowType" AS ENUM ('CT', 'HT', 'Derby');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Individual', 'Business');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('Mobile', 'Home', 'Business');

-- CreateEnum
CREATE TYPE "Division" AS ENUM ('Prelim', 'Train', 'Novice', 'BGN', 'GOLD', 'GAG');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('President', 'Vice President', 'Secretary', 'Treasurer', 'Adult Member At Large', 'Junior Member At Large', 'Social Media Manager', 'Awards Coordinator', 'Points');

-- CreateTable
CREATE TABLE "NonMemberHorseOwner" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "phoneType" "PhoneType" NOT NULL DEFAULT 'Mobile',

    CONSTRAINT "NonMemberHorseOwner_pkey" PRIMARY KEY ("fullName")
);

-- CreateTable
CREATE TABLE "Member" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(25) NOT NULL,
    "state" VARCHAR(25) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "phoneType" "PhoneType" NOT NULL DEFAULT 'Mobile',
    "email" VARCHAR(100) NOT NULL,
    "comments" VARCHAR(4000),
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "businessName" VARCHAR(100),
    "membershipDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "membershipEnd" TIMESTAMP(3),
    "memberType" "Type" NOT NULL,
    "memberStatus" "Status" NOT NULL,
    "memberStatusType" "StatusType" NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "zip" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("fullName")
);

-- CreateTable
CREATE TABLE "Boardmember" (
    "name" VARCHAR(100),
    "email" VARCHAR(100),
    "position" "Position" NOT NULL,

    CONSTRAINT "Boardmember_pkey" PRIMARY KEY ("position")
);

-- CreateTable
CREATE TABLE "Horse" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "horseRN" VARCHAR(255) NOT NULL,
    "horseAKA" VARCHAR(255),
    "memberName" TEXT,
    "registrationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "regType" "Status" NOT NULL,
    "owner" TEXT,
    "registrationEnd" TIMESTAMP(3),

    CONSTRAINT "Horse_pkey" PRIMARY KEY ("horseRN")
);

-- CreateTable
CREATE TABLE "RiderCombo" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "division" "Division" NOT NULL,
    "totalPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalShows" INTEGER NOT NULL DEFAULT 0,
    "completedHT" BOOLEAN NOT NULL DEFAULT false,
    "multiVenue" BOOLEAN NOT NULL DEFAULT false,
    "memberName" TEXT NOT NULL,
    "horseName" TEXT NOT NULL,
    "showYear" INTEGER,

    CONSTRAINT "RiderCombo_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Points" (
    "uid" TEXT NOT NULL,
    "riderUid" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "place" TEXT NOT NULL,
    "showUid" TEXT NOT NULL,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Show" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "showName" VARCHAR(150) NOT NULL,
    "showType" "ShowType" NOT NULL,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "showDate" TIMESTAMP(3) NOT NULL,
    "showEndDate" TIMESTAMP(3),
    "url" TEXT,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "_RiderComboToShow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Horse_owner_idx" ON "Horse"("owner");

-- CreateIndex
CREATE INDEX "Horse_memberName_idx" ON "Horse"("memberName");

-- CreateIndex
CREATE INDEX "RiderCombo_horseName_memberName_division_showYear_idx" ON "RiderCombo"("horseName", "memberName", "division", "showYear");

-- CreateIndex
CREATE UNIQUE INDEX "RiderCombo_memberName_horseName_division_showYear_key" ON "RiderCombo"("memberName", "horseName", "division", "showYear");

-- CreateIndex
CREATE INDEX "Points_riderUid_idx" ON "Points"("riderUid");

-- CreateIndex
CREATE INDEX "Points_showUid_idx" ON "Points"("showUid");

-- CreateIndex
CREATE UNIQUE INDEX "Show_showName_showDate_key" ON "Show"("showName", "showDate");

-- CreateIndex
CREATE UNIQUE INDEX "_RiderComboToShow_AB_unique" ON "_RiderComboToShow"("A", "B");

-- CreateIndex
CREATE INDEX "_RiderComboToShow_B_index" ON "_RiderComboToShow"("B");
