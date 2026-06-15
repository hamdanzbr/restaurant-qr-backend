import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createOrderSchema } from "../validators/order.validator.js";

const router = express.Router();

router.post("/",validate(createOrderSchema), createOrder);

router.get("/", getOrders);

router.get("/:id", getOrderById);

router.patch(
  "/:id/status",
  updateOrderStatus
);

export default router;