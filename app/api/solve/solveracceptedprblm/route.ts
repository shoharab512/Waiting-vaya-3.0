import database from "@/DataBase/database";
import { Solve } from "@/model/SolveModel";
import { User } from "@/model/userModel";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookiesInf = cookies().get("authjs.session-token") || cookies().get("__Secure-authjs.session-token");

    const userCookies = await decode({
      token: cookiesInf?.value!,
      salt: cookiesInf?.name!,
      secret: process.env.AUTH_SECRET!,
    });

    await database();
    const { searchParams } = new URL(req.url);
    const user = await User.findOne({ email: userCookies?.email });
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const solvedProblems = await Solve.find({ users: user?._id })
      .sort({ createdAt: -1 }).limit(limit)
      .skip((page - 1) * limit)
      .populate("users").populate("problemId");

    const totalProblems = await Solve.countDocuments({ users: user?._id })
    return NextResponse.json(
      { success: true, message: "Solved problems founded successfully", data: solvedProblems, totalPages: Math.ceil(totalProblems / limit), currentPage: page },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
