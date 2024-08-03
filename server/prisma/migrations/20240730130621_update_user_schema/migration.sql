/*
  Warnings:

  - You are about to drop the column `formId` on the `Application` table. All the data in the column will be lost.
  - Added the required column `form` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "formId",
ADD COLUMN     "form" JSONB NOT NULL;
