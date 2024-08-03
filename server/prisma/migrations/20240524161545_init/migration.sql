/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "petBreed" DROP NOT NULL,
ALTER COLUMN "tags" DROP NOT NULL,
ALTER COLUMN "published" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "token" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
