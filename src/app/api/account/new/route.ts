import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { redirect } from "next/navigation";

export async function POST(req) {
  const Body = await req.json();

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
    return NextResponse.json({
      message: "Records Created!",
      created: true,
      id: saved_data.id,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Failed",
      error: "Already Exists",
      targets: e.meta.target,
      created: false,
    });
  }
}
