-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "isQnaSolveDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "qnaMarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "submissionTime" TIMESTAMP(3);
