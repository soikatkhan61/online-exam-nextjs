/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - Added the required column `ans` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opt1` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opt2` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opt3` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opt4` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_text` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_text" TEXT NOT NULL,
    "opt1" TEXT NOT NULL,
    "opt2" TEXT NOT NULL,
    "opt3" TEXT NOT NULL,
    "opt4" TEXT NOT NULL,
    "ans" TEXT NOT NULL,
    "examId" INTEGER NOT NULL,
    CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("examId", "id") SELECT "examId", "id" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
