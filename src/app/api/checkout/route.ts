import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/prisma";
import Razorpay from "razorpay";
export async function GET(Request: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_1",
  };

  let data = await razorpay.orders
    .create(options)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return `Error: ${error}`;
    });

  return NextResponse.json(data);
}
