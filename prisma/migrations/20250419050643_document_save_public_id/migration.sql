/*
  Warnings:

  - You are about to drop the column `imagesUrl` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `documents` table. All the data in the column will be lost.
  - Added the required column `publicId` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "imagesUrl",
DROP COLUMN "name",
ADD COLUMN     "publicId" TEXT NOT NULL;
