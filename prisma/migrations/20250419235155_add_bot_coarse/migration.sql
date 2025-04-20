/*
  Warnings:

  - Added the required column `coarse` to the `expertBot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expertBot" ADD COLUMN     "coarse" TEXT NOT NULL;
