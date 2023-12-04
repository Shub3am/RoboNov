/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `customer_Address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordersignature` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentid` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
ADD COLUMN     "customer_Address" TEXT NOT NULL,
ADD COLUMN     "orderno" SERIAL NOT NULL,
ADD COLUMN     "ordersignature" INTEGER NOT NULL,
ADD COLUMN     "paymentid" INTEGER NOT NULL,
ALTER COLUMN "orderid" DROP DEFAULT,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("orderno");
DROP SEQUENCE "orders_orderid_seq";
