import express from "express";

import {
  getAnalyticsCharts,
  getAnalyticsOverview,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/overview", getAnalyticsOverview);

router.get("/charts", getAnalyticsCharts);

export default router;
