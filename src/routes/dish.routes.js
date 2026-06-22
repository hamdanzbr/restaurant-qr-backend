import express from "express";

import {
  createDish,
  deleteDish,
  getDishById,
  getDishes,
  getDishStats,
  updateDish,
} from "../controllers/dish.controller.js";
import { authorize } from "../middleware/role.middleware.js";
import { createDishSchema } from "../validators/dish.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authenticate,authorize("CHEF","ADMIN"), validate(createDishSchema), createDish);

router.get("/", getDishes);

router.get("/stats", getDishStats);

router.get("/:id", getDishById);

router.put("/:id",authenticate,authorize("CHEF","ADMIN"), updateDish);

router.delete("/:id",authenticate,authorize("ADMIN"),deleteDish);
export default router;
