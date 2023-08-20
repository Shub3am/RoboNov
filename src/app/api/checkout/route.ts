import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/prisma";
import Razorpay from "razorpay";
export async function GET(Request: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
}
