import mongoose from "mongoose";

export default async function connect(url: string) {
    await mongoose.connect(url);
    console.log("Database Connected....!")
}