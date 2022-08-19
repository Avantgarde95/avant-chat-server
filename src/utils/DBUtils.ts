import mongoose from "mongoose";

export function generateID() {
  return new mongoose.Types.ObjectId().toHexString();
}
