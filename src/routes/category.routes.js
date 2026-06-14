import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/category.controller.js";
import { getCategoryById } from "../controllers/category.controller.js";
import { updateCategory } from "../controllers/category.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/",authorize("ADMIN"), createCategory);

router.get("/:id", getCategoryById);

router.put("/:id",authorize("ADMIN"), updateCategory);

router.delete("/:id",authorize("ADMIN"), deleteCategory);
export default router;