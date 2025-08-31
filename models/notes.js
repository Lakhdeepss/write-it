import mongoose, { models } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Note = models.Note || mongoose.model("Note", noteSchema);

export default Note;
