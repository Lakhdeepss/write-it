// 'use server'

import Note from "@/models/notes";
import { connectDB } from "@/lib/dbConnect";

export const getnotes = async () => {
    await connectDB();
    const notes = await Note.find();
    console.log("Fetched notes:", notes);
    return notes;
}
