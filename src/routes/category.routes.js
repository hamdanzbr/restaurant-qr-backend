import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/category.controller.js";
import { getCategoryById } from "../controllers/category.controller.js";
import { updateCategory } from "../controllers/category.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";
import { authorize } from "../middleware/role.middleware.js";
import { createCategorySchema } from "../validators/category.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { getCategoryStats } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/stats", getCategoryStats);

router.post("/",authenticate,authorize("ADMIN"), validate(createCategorySchema), createCategory);

router.get("/:id", getCategoryById);

router.put("/:id",authenticate,authorize("ADMIN"), updateCategory);

router.delete("/:id",authenticate,authorize("ADMIN"), deleteCategory);
export default router;
