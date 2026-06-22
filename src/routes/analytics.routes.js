import express from "express";

import {
  getAnalyticsCharts,
  getAnalyticsOverview,
} from "../controllers/analytics.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/overview",authenticate, getAnalyticsOverview);

router.get("/charts",authenticate, getAnalyticsCharts);

export default router;
