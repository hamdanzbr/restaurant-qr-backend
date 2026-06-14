import express from "express";

import {
  createDish,
  deleteDish,
  getDishById,
  getDishes,
  updateDish,
} from "../controllers/dish.controller.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",authorize("ADMIN","CHEF"), createDish);

router.get("/", getDishes);

router.get("/:id", getDishById);

router.put("/:id",authorize("ADMIN","CHEF"), updateDish);

router.delete("/:id",authorize("ADMIN","CHEF"), deleteDish);
export default router;