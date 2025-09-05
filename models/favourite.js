import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

export default Favourite;
