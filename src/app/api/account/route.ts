import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  let Body: { email: string; password: string };
  try {
    Body = await request.json(); //checking whether request body is there or not
  } catch (e) {
    return NextResponse.json("Please Check Response and Try Again"); //throwing error if body is empty
  }

  try {
    if (Body.email && Body.password) {
      //checking if email and password exists on Body or not
      const checkUser = await prisma.users.findUniqueOrThrow({
        where: { email: Body.email },
      });
      const checkPass = await bcrypt.compareSync(
        Body.password,
        checkUser.password
      );
      console.log(checkUser, checkPass);
      if (checkPass) {
        const { name, id, email } = checkUser;
        return NextResponse.json({
          UserData: {
            name,
            id,
            email,
          },
          error: false,
        });
      } else {
        return NextResponse.json({
          message: "Email or Password is incorrect!",
          error: true,
        });
      }
    } else {
      return NextResponse.json("Email Missing"); //returning error if email and password is not there in request
    }
  } catch (error) {
    if (error.code == "P2025") {
      //Checking if user exists using prisma's error code
      return NextResponse.json("No User Found");
    } else {
      console.log(error);
      return NextResponse.json("Please Try Again After Sometime");
    }
  }
}
