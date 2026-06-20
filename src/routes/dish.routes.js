import express from "express";

import {
  createDish,
  deleteDish,
  getDishById,
  getDishes,
  updateDish,
} from "../controllers/dish.controller.js";
import { authorize } from "../middleware/role.middleware.js";
import { createDishSchema } from "../validators/dish.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/",validate(createDishSchema), createDish);

router.get("/", getDishes);

router.get("/:id", getDishById);

router.put("/:id", updateDish);

router.delete("/:id", deleteDish);
export default router;