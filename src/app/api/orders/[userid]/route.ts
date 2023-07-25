import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/prisma";
import VerifyRoute from "@/app/lib/verifyRoute";

export async function GET(request, context) {
  return NextResponse.json(context);
}
