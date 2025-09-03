import { connectDB } from "@/lib/dbConnect";
import User from "@/models/users";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {

        const { email } = await request.json();

        await connectDB();
        const user = await User.findOne({ email }).select('_id');
        console.log(user);
        return NextResponse.json({ user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


};