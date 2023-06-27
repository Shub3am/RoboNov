import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function POST(request: NextRequest) {
  let body: { productId: number; cartId: number } = await request.json();
  if (body.cartId) {
    try {
      const currentCart = await prisma.cart.findFirst({
        where: { id: body.cartId },
      });

      const updateCart = await prisma.cart.update({
        where: { id: body.cartId },
        data: { productid: { push: String(body.productId) } },
        select: { productid: true },
      });
      console.log(updateCart);
      return NextResponse.json({
        message: "Product Added to Cart",
        success: true,
      });
    } catch (err) {
      console.log(err);
      return NextResponse.json({
        message: "Server Error",
        success: false,
      });
    }
  } else {
    return NextResponse.json("No cart found");
  }
}
