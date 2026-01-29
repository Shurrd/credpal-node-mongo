import mongoose from "mongoose";
import { IProduct } from "../../interfaces/product.interface";
import { Product } from "../../models/product.model";
import { CustomError } from "../../utils/customError";

export const createProduct = async (body: IProduct, userId: string) => {
  const product = await Product.create({
    ...body,
    createdBy: userId,
  });

  return product;
};

export const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};

export const getUserProducts = async (userId: string) => {
  const products = await Product.find({ createdBy: userId });

  return products;
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new CustomError("Product not found", 404);

  return product;
};

export const updateProduct = async (
  body: IProduct,
  productId: string,
  userId: string,
) => {
  const product = await Product.findById(productId);

  if (!product) throw new CustomError("Product not found", 404);

  if (product.createdBy.toString() != userId.toString())
    throw new CustomError(
      "Unauthorized: You can only update your own products",
      401,
    );

  const updatedProduct = await Product.findByIdAndUpdate(productId, body, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};

export const deleteProduct = async (productId: string, userId: string) => {
  const product = await Product.findById(productId);

  if (!product) throw new CustomError("Product not found", 404);

  if (product.createdBy.toString() != userId.toString())
    throw new CustomError(
      "Unauthorized: You can only delete your own products",
      401,
    );

  await Product.findByIdAndDelete(productId);

  return { message: "Product deleted successfully" };
};
