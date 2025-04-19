-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "flashCard" JSONB,
ADD COLUMN     "isFlashDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isQNADone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSummaryDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "qna" JSONB,
ADD COLUMN     "summary" JSONB;
