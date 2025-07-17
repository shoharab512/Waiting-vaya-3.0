import { NextRequest, NextResponse } from "next/server";
import database from "@/DataBase/database";
import { Solve } from "@/model/SolveModel";

export async function GET(req: NextRequest) {
  try {
    await database();
    const solveid = req.nextUrl.pathname.split("/").pop();
    const solveusers = await Solve.find({problemId: solveid}).populate({
      path:"users",
    }).sort({createdAt: -1});
    return NextResponse.json(
      { success: true, message: "Problem Founded", data: solveusers },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}