import mongoose from "mongoose";
const url = "mongodb+srv://lakhdeep:saggu123@mycluster.jilzsnu.mongodb.net/notes?retryWrites=true&w=majority&appName=mycluster";



let isConnected = false; // track the connection

export const connectDB = async () => {
    if (isConnected) {
        console.log("=> using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(url);

        isConnected = db.connections[0].readyState === 1;
        console.log("=> new database connection established");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};