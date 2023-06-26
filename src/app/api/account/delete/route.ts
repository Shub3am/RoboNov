//This is for my own reference only
//Dev's Tool, Not for production
//Will be deleted in production

import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  await prisma.users.deleteMany({ where: {} });
  await prisma.cart.deleteMany({ where: {} });
  return NextResponse.json("Done");
}
