/*
  Warnings:

  - Added the required column `storeId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "storeId" VARCHAR(32) NOT NULL;
