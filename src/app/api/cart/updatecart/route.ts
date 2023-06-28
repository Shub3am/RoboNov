import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
export async function POST(request: NextRequest) {
  let body: { productId: number; cartId: number } = await request.json();
  if (body.cartId) {
    try {
      const currentCart = await prisma.cart.findFirst({
        where: { id: body.cartId },
      });
      if (currentCart.productid.includes(String(body.productId))) {
        return NextResponse.json({
          message: "Product Already In Cart",
          success: false,
        });
      } else {
        const updateCart = await prisma.cart.update({
          where: { id: body.cartId },
          data: { productid: { push: String(body.productId) } },
          select: { productid: true },
        });

        return NextResponse.json({
          message: "Product Added to Cart",
          success: true,
        });
      }
    } catch (err) {
      return NextResponse.json({
        message: "Server Error",
        success: false,
      });
    }
  } else {
    return NextResponse.json("No cart found");
  }
}
