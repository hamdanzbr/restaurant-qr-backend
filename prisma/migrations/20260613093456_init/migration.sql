/*
  Warnings:

  - You are about to alter the column `description` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "description" SET DATA TYPE VARCHAR(200);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
