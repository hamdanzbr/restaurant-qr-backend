import express from "express";

import { getProfile, loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", authenticate, getProfile);
export default router;
