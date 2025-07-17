import database from "@/DataBase/database";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);
        const role = searchParams.get("id");


        if (!role) {
            return NextResponse.json(
                { success: false, message: "Role not found" },
                { status: 400 }
            );
        }
        await database();
        const { email } = await req.json();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        user.role = role;
        await user.save();
        return NextResponse.json(
            { success: true, message: "User role successfully updated" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
