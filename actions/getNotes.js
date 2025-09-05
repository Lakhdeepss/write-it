

import Note from "@/models/notes";
import { connectDB } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getnotes = async () => {
    await connectDB();

    // get logged-in user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    // fetch only their notes
    const notes = await Note.find({ userId: session.user.id });
    console.log("Fetched notes:", notes);

    return JSON.parse(JSON.stringify(notes));
};
