import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (typeof Number(params.id) !== null) {
    const singleProduct = await prisma.products.findFirst({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(singleProduct);
  } else {
    return NextResponse.json("Invalid ID");
  }
}
