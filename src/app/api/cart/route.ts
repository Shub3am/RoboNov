import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";

export async function POST(Request: NextRequest) {
  const body = await Request.json(); //We will get cartId of User from this
  if (body.id) {
    try {
      const cartLength = await prisma.cart.findUniqueOrThrow({
        where: { id: body.id },
        select: { productid: true },
      });
      console.log(cartLength.produ);
      return NextResponse.json(cartLength.productid); //productid is JSON array which contains all the products
    } catch (err) {
      if (err.code === "P2025") {
        return NextResponse.json({ error: "No Cart Found" });
      } else {
        return NextResponse.json("Server Error");
      }
    }
  } else {
    return NextResponse.json("Body without id");
  }
}
