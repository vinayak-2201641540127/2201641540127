import mongoose from "mongoose";
import { Log } from "./logger.js";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://vinayak:vinayak123@cluster0.wdjmu0r.mongodb.net/");
    await Log("backend", "info", "db", "MongoDB connected");
  } catch (err) {
    await Log("backend", "fatal", "db", `MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
}


