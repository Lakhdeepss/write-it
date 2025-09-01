'use server'
import { connectDB } from "@/lib/dbConnect";
import Note from "@/models/notes";

export const getNotesDetails = async (id) => {
    try {
        await connectDB();
        let note = await Note.findById(id);
        console.log("Fetched note details:", note);
        return JSON.parse(JSON.stringify(note));
    } catch (error) {
        console.error("Error fetching note details:", error);
        throw new Error("Failed to fetch note details");
    }
};
