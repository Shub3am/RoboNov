import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";

export async function POST(Request: NextRequest) {
  const Body = await Request.json();

  try {
    let saved_data = await prisma.users.create({
      data: {
        name: Body.name,
        age: Number(Body.age),
        email: Body.email,
        phone: Number(Body.phone),
        password: Body.password,
      },
      select: { id: true },
    });
    console.log(saved_data);
    await prisma.cart.create({ data: { user_id: saved_data.id } });
    await prisma.users.findMany({ include: { cart: true } });
    return NextResponse.json({
      message: "Records Created!",
      created: true,
      id: saved_data.id,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed",
      error: "Already Exists",
      targets: error.meta.target,
      created: false,
    });
  }
}
