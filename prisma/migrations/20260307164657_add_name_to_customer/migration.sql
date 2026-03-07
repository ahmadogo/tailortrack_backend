/*
  Warnings:

  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'STAFF';

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "name" TEXT NOT NULL;
