import express from "express";

import {
  getDashboardSummary,
  getOrdersOverview,
  getPopularDishes,
  getRevenueChart,
} from "../controllers/dashboard.controller.js";
import { getRecentOrders } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/summary", getDashboardSummary);

router.get("/revenue-chart", getRevenueChart);

router.get("/orders-overview", getOrdersOverview);

router.get("/popular-dishes", getPopularDishes);

router.get("/recent-orders", getRecentOrders);

export default router;
