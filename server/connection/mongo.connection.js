// connection/mongo.connection.js
import mongoose from "mongoose";

let isConnected = false; // ✅ cache connection

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing DB connection");
    return; // ✅ don't reconnect if already connected
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("DB connection failed:", error);
  }
};