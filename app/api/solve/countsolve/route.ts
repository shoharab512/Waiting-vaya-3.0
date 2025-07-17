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

        const user = await User.findOne({ email: userCookies?.email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const solvedCount = await Solve.countDocuments({ users: user?._id });



        return NextResponse.json(
            { success: true, message: "Count Solved", data: solvedCount, },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
