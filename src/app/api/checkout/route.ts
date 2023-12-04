import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/prisma";
import Razorpay from "razorpay";

export async function POST(Request: NextRequest) {
  const Body: {amount: number} = await Request.json()
  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: Body.amount, // amount in the smallest currency unit
    currency: "INR",
  };

  let data: {result: boolean | Object} = await razorpay.orders
    .create(options)
    .then(result => { return {result}})
    .catch((error) => {
      return {result: false, error: error};
    });
    console.log(data, 'outside')
    if (data.result) {
      console.log(data)
      let {id, amount, status} = data.result
    const createOrder = await prisma.orders.create({data: { orderid: id, amount: amount, status: status }}) 
      return NextResponse.json({id, amount, status}) }
    else {
      return NextResponse.json(`Error due to ${data.error}`)
    }
}
