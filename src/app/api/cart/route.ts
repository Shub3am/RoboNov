import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";

export async function POST(Request: NextRequest) {
  const body = await Request.json();

  try {
    const cartLength = await prisma.cart.findUniqueOrThrow({
      where: { id: body.id },
      select: { productid: true },
    });
    return NextResponse.json(cartLength.productid);
  } catch (err) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "No Cart Found" });
    } else {
      return NextResponse.json("Server Error");
    }
  }
}
