import express from "express";

import {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
} from "../controllers/table.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",authenticate,authorize("ADMIN"), createTable);

router.get("/", getTables);

router.get("/:id", getTableById);

router.put("/:id",authenticate,authorize("ADMIN"), updateTable);

router.delete("/:id",authenticate,authorize("ADMIN"), deleteTable);

export default router;