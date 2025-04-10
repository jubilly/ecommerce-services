/*
  Warnings:

  - Added the required column `storeId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "storeId" INTEGER NOT NULL,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Products_id_key";
