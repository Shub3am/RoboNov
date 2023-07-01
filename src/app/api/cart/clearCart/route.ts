import { NextRequest } from "next/server";
import VerifyRoute from "@/app/lib/verifyRoute";
import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";

export async function POST(request: NextRequest) {
  const body: { id: number } = await request.json();
  const accessToken = await request.headers.get("authorization");
  let verifyToken = await VerifyRoute(accessToken);
  if (accessToken && verifyToken) {
    try {
      let Result = await prisma.cart.update({
        where: { id: body.id },
        data: { productid: { set: [] } },
        select: { productid: true },
      });

      return NextResponse.json({ message: "Cart Cleared", success: true });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ message: "Error, Try Again", success: false });
    }
  } else {
    return NextResponse.json("Authorization Not Found");
  }
}
