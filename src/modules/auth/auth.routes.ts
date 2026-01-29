import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./dto/request.dto";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);

export default router;
