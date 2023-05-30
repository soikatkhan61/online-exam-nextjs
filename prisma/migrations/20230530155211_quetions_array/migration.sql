/*
  Warnings:

  - You are about to drop the column `questions` on the `Exam` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "examId" INTEGER NOT NULL,
    CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "ans_published" BOOLEAN NOT NULL
);
INSERT INTO "new_Exam" ("ans_published", "duration", "endTime", "id", "marks", "name", "startTime", "topic") SELECT "ans_published", "duration", "endTime", "id", "marks", "name", "startTime", "topic" FROM "Exam";
DROP TABLE "Exam";
ALTER TABLE "new_Exam" RENAME TO "Exam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
