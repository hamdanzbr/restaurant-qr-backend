import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/category.controller.js";
import { getCategoryById } from "../controllers/category.controller.js";
import { updateCategory } from "../controllers/category.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", createCategory);

router.get("/:id", getCategoryById);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);
export default router;