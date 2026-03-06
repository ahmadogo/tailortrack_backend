/*
  Warnings:

  - The values [READY,DELIVERED,CANCELLED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SUPER_ADMIN,FASHION_HOUSE_OWNER,STAFF] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `clothingType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryDate` on the `Order` table. All the data in the column will be lost.
  - Added the required column `inseam` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neck` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shoulder` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurementId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'CUSTOMER', 'TAILOR', 'FASHION_HOUSE');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "Staff" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Measurement" ADD COLUMN     "inseam" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "neck" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "shoulder" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "clothingType",
DROP COLUMN "deliveryDate",
ADD COLUMN     "measurementId" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
