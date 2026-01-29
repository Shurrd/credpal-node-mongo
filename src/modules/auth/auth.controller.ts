import { Request, Response, NextFunction } from "express";
import { login, register } from "./auth.service";
import { asyncHandler } from "../../middleware/asyncHandler";

export const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await login(req.body);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data,
    });
  },
);
