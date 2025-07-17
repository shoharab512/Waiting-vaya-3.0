import cloudinary from "@/cloudinary/cloudinary";
import database from "@/DataBase/database";
import { Solve } from "@/model/SolveModel";
import { User } from "@/model/userModel";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookiesInf = cookies().get("authjs.session-token") || cookies().get("__Secure-authjs.session-token");

    const userCookies = await decode({
      token: cookiesInf?.value!,
      salt: cookiesInf?.name!,
      secret: process.env.AUTH_SECRET!,
    });
    const { image, message, problemId } = await req.json();
    if (!message || !problemId) {
      return NextResponse.json(
        { success: false, message: "Message is required..." },
        { status: 404 }
      );
    }
    await database();
    const user = await User.findOne({ email: userCookies?.email });
    if (user?._id === undefined) {
      return NextResponse.json(
        { success: false, message: "Please Log in first" },
        { status: 404 }
      )
    }
    let cloudeResponse: any;
    if (image) {
      try {
        cloudeResponse = await cloudinary.uploader.upload(image)
      } catch (error) {
        return NextResponse.json(
          { success: false, message: "Internal Server Error_Cloudinary" },
          { status: 500 }
        );
      }
    }
    await Solve.create({
      users: user?._id,
      image: cloudeResponse?.url || "",
      message: message || "Solver didn't provide any message...",
      problemId,
    });
    return NextResponse.json(
      { success: true, message: "Answer Submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
