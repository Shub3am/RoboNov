import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/prisma";
import VerifyRoute from "@/app/lib/verifyRoute";

export async function GET(request, context) {
  console.log(context);
  return NextResponse.json(context);
}
