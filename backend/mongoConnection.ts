import mongoose from "mongoose";
import { Express } from "express";
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI!;

export const mongoConnection = async (app: Express) => {

    try {
        mongoose.set("strict", false);
        await mongoose.connect(MONGODB_URI);
        console.log("connected to db");
        app.listen(PORT, async () => {
            console.log(`Server started  on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        throw new Error("DB CONNECTION FAILED");
    }
}