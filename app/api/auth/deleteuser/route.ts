import database from "@/DataBase/database";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        // Since DELETE doesn't typically have a body, let's get email from URL query parameters
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email not found" },
                { status: 400 }
            );
        }

        // Ensure database connection
        await database();

        // Find and delete the user
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "User Deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
