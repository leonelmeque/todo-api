/*
  Warnings:

  - You are about to drop the column `restrictedTo` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "restrictedTo";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
