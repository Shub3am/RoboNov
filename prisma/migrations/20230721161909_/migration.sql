/*
  Warnings:

  - You are about to drop the column `productname` on the `orders` table. All the data in the column will be lost.
  - Added the required column `productid` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "productname",
ADD COLUMN     "productid" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
