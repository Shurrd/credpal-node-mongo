import { Response, NextFunction } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getUserProducts,
  updateProduct,
} from "./product.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export const createProductController = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const data = await createProduct(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data,
    });
  },
);

export const getAllProductsController = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const data = await getAllProducts();

    res.status(201).json({
      success: true,
      message: "Products fetched successfully",
      data,
    });
  },
);

export const getUserProductsController = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const data = await getUserProducts(userId);

    res.status(201).json({
      success: true,
      message: "Products fetched successfully",
      data,
    });
  },
);

export const getProductByIdController = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const data = await getProductById(id as string);

    res.status(201).json({
      success: true,
      message: "Product fetched successfully",
      data,
    });
  },
);

export const updateProductController = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const data = await updateProduct(req.body, id as string, userId);

    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data,
    });
  },
);

export const deleteProductController = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const data = await deleteProduct(id as string, userId);

    res.status(201).json({
      success: true,
      message: data.message,
    });
  },
);
