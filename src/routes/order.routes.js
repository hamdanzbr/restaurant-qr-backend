import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats,
} from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createOrderSchema } from "../validators/order.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", validate(createOrderSchema), createOrder);

router.get("/", getOrders);

router.get("/stats", getOrderStats);

router.get("/:id", getOrderById);

router.patch("/:id/status",authenticate,authorize("CHEF","ADMIN"), updateOrderStatus);

export default router;
