import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function GET(request: NextRequest) {
  let { searchParams } = new URL(request.url);
  let limitOption = searchParams.get("limit");
  if (limitOption) {
    const products = await prisma.products.findMany({
      where: { id: { lt: Number(limitOption) }, rating: { gt: 3 } }, //sending id's with less than limit option and rating higher than 3
    });
    console.log(products);
    return NextResponse.json(products);
  } else {
    const products = await prisma.products.findMany({
      where: { id: { gt: 10 }, rating: { gt: 3 } }, //sending all ids more than 10 and rating higher than 3
    });
    return NextResponse.json(products);
  }
}
