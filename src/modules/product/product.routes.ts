import { Router } from "express";
import { validate } from "../../middleware/validate";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  getUserProductsController,
  updateProductController,
} from "./product.controller";
import { createProductSchema, updateProductSchema } from "./dto/request.dto";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", getAllProductsController);
router.get("/me", authMiddleware, getUserProductsController);
router.get("/:id", getProductByIdController);

router.post(
  "/",
  authMiddleware,
  validate(createProductSchema),
  createProductController,
);
router.put(
  "/:id",
  authMiddleware,
  validate(updateProductSchema),
  updateProductController,
);
router.delete("/:id", authMiddleware, deleteProductController);

export default router;
