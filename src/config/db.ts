import mongoose from "mongoose";

export const connectDB = async () => {
  const DB_URL = process.env.DB_URL as string;
  mongoose
    .connect(DB_URL, {
      dbName: process.env.DB_NAME as string,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
      process.exit(1);
    });
};
