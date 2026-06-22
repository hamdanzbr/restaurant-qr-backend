import express from "express";

import {
  getDashboardSummary,
  getOrdersOverview,
  getPopularDishes,
  getRevenueChart,
} from "../controllers/dashboard.controller.js";
import { getRecentOrders } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/summary",authenticate, getDashboardSummary);

router.get("/revenue-chart",authenticate, getRevenueChart);

router.get("/orders-overview",authenticate, getOrdersOverview);

router.get("/popular-dishes",authenticate, getPopularDishes);

router.get("/recent-orders",authenticate, getRecentOrders);

export default router;
