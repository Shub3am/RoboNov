import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (params.id == "all") {
    try {
      const allProducts = await prisma.products.findMany();
      return NextResponse.json({ products: allProducts, success: true });
    } catch (error) {
      return NextResponse.json({
        error: "Something Failed At Database Level",
        success: false,
      });
    }
  } else if (!isNaN(params.id)) {
    const singleProduct = await prisma.products.findFirst({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(singleProduct);
  } else {
    return NextResponse.json({ error: "Invalid ID", success: false });
  }
}
