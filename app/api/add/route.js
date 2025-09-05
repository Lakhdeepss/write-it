import { connectDB } from "@/lib/dbConnect";
import Note from "@/models/notes";
import { NextResponse } from "next/server";

// post notes
export async function POST(request) {
    try {
        await connectDB();
        const { title, content, userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const note = new Note({ title, content, userId });
        await note.save();
        console.log("Note saved:", note);

        return NextResponse.json({ message: "Note added successfully", note }, { status: 201 });
    } catch (error) {
        console.error("Error saving note:", error);
        return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
    }
}
