import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", productSchema);
