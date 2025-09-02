"use server";

import { connectDB } from "@/lib/dbConnect";
import Note from "@/models/notes";

export const deleteNote = async (id) => {
    await connectDB();

    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) {
        return { success: false, message: "Note not found" };
    }

    return { success: true, message: "Note deleted successfully" };
};
