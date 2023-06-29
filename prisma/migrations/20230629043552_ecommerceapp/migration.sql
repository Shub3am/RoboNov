/*
  Warnings:

  - A unique constraint covering the columns `[thumbnail]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_thumbnail_key" ON "products"("thumbnail");
