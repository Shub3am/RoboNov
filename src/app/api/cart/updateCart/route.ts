import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import VerifyRoute from "@/app/lib/verifyRoute";
export async function POST(request: NextRequest) {
  let body: { productId: number; cartId: number } = await request.json();
  let accessToken = request.headers.get("authorization"); //Getting Token from authorization header which we sent with fetch request
  let verifyToken = await VerifyRoute(accessToken); //Verifying with jsonwebtoken library
  if (accessToken && verifyToken) {
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
  } else {
    return NextResponse.json("Authorization Not Found", { status: 401 }); //Authorization has failed in this step
  }
}
