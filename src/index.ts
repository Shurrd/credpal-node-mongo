import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`
      ########################################
      🛡️  Server is running on port: ${PORT}  🛡️
      ########################################
      `);
    });
  } catch (error) {
    console.error("Server starting error:", error);
    process.exit(1);
  }
}

startServer();
