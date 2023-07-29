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
        // INCREMENTING EXISITNG PRODUCT QUANTITY
        if (currentCart.productid.includes(String(body.productId))) {
          let incrementedCart = currentCart?.productid.map((product) => {
            if (product.productid == Number(body.productId)) {
              return { ...product, qty: product.qty + 1 };
            } else {
              return product;
            }
          });
          const incrementedDB = await prisma.cart.update({
            where: { id: body.cartId },
            data: { productid: incrementedCart },
          });
          return NextResponse.json({
            message: "Product Quantity Incremented",
            success: true,
          }); //Adding New Product to Cart FROM BELOW
        } else {
          let updatedCart = currentCart?.productid;
          updatedCart.push({ productid: String(body.productId), qty: 1 });
          console.log(updatedCart, "------UPDATED CART--------------");
          const updateCart = await prisma.cart.update({
            where: { id: body.cartId },
            data: {
              productid: updatedCart,
            },
            select: { productid: true },
          });

          return NextResponse.json({
            message: "Product Added to Cart",
            success: true,
          });
        }
      } catch (err) {
        console.error(err);
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
