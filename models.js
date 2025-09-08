import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  expiry: { type: Date } 
}, { timestamps: true });

export const URL = mongoose.model("URL", urlSchema);
