import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function GET() {
  const products = await prisma.products.findMany({
    where: { id: { lt: 10 }, rating: { gt: 3 } },
  });
  return NextResponse.json(products);
}
