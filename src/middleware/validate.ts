import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { CustomError } from "../utils/customError";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new CustomError(errorMessage, 400);
    }

    next();
  };
};
