/*
  Warnings:

  - The `productid` column on the `cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "productid",
ADD COLUMN     "productid" JSONB[];
