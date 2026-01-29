import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  createdBy: string;
}
