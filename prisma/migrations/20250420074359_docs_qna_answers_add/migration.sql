-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "qnaAnswers" TEXT[] DEFAULT ARRAY[]::TEXT[];
