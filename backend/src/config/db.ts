import mongoose from "mongoose";
import { config } from "./env";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};