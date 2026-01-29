import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let isOperational = false;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  } else if (err.name === "MongoServerError" && (err as any).code === 11000) {
    statusCode = 409;
    message = "Duplicate field value entered";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (err instanceof SyntaxError && "body" in err) {
    statusCode = 400;
    message = "Invalid JSON format";
  }

  if (statusCode >= 500) {
    console.error("Server Error:", {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      stack: err.stack,
    }),
  });
};
