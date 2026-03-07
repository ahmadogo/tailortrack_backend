/*
  Warnings:

  - You are about to drop the column `fashionHouseId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `tailorId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_fashionHouseId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tailorId_fkey";

-- DropIndex
DROP INDEX "Staff_userId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "fashionHouseId",
ADD COLUMN     "createdByFashionHouseId" INTEGER,
ADD COLUMN     "createdByUserId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FashionHouse" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Measurement" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tailorId",
ADD COLUMN     "staffId" INTEGER,
ADD COLUMN     "tailorUserId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "role";

-- CreateIndex
CREATE INDEX "Customer_createdByUserId_idx" ON "Customer"("createdByUserId");

-- CreateIndex
CREATE INDEX "Customer_createdByFashionHouseId_idx" ON "Customer"("createdByFashionHouseId");

-- CreateIndex
CREATE INDEX "Order_tailorUserId_idx" ON "Order"("tailorUserId");

-- CreateIndex
CREATE INDEX "Order_staffId_idx" ON "Order"("staffId");

-- CreateIndex
CREATE INDEX "Staff_userId_idx" ON "Staff"("userId");

-- CreateIndex
CREATE INDEX "Staff_fashionHouseId_idx" ON "Staff"("fashionHouseId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdByFashionHouseId_fkey" FOREIGN KEY ("createdByFashionHouseId") REFERENCES "FashionHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tailorUserId_fkey" FOREIGN KEY ("tailorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
