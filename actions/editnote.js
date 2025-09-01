'use server'
import { connectDB } from "@/lib/dbConnect";
import Note from "@/models/notes";

export const editNote = async (id, updateFields) => {
    await connectDB();
    const note = await Note.findById(id);
    if (!note) throw new Error("Note not found");

    if (updateFields.title !== undefined) note.title = updateFields.title;
    if (updateFields.content !== undefined) note.content = updateFields.content;

    await note.save();
    return JSON.parse(JSON.stringify(note));
};
