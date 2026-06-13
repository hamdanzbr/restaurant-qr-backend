import express from "express";

import {
  createDish,
  deleteDish,
  getDishById,
  getDishes,
  updateDish,
} from "../controllers/dish.controller.js";

const router = express.Router();

router.post("/", createDish);

router.get("/", getDishes);

router.get("/:id", getDishById);

router.put("/:id", updateDish);

router.delete("/:id", deleteDish);
export default router;