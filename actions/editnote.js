'use server'
import { connectDB } from "@/lib/dbConnect";
import Note from "@/models/notes";

export const editNote = async (id, title, content) => {
    await connectDB();
    const note = await Note.findById(id);
    if (!note) throw new Error("Note not found");

    note.title = title
    note.content = content;

    await note.save();
    return JSON.parse(JSON.stringify(note));
};
