import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (params.id == "all") {
    const allProducts = await prisma.products.findMany();
    return NextResponse.json({ products: allProducts });
  } else if (!isNaN(params.id)) {
    const singleProduct = await prisma.products.findFirst({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(singleProduct);
  } else {
    return NextResponse.json("Invalid ID");
  }
}
