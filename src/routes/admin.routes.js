import express from "express";

import { getProfile, loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerAdminSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register",validate(registerAdminSchema), registerAdmin);
router.post("/login",validate(loginSchema), loginAdmin);
router.get("/profile", authenticate, getProfile);
export default router;
