import {
  getAnalyticsChartsService,
  getAnalyticsOverviewService,
} from "../services/analytics.service.js";

import asyncHandler from "../utils/asyncHandler.js";

export const getAnalyticsOverview =
  asyncHandler(async (req, res) => {
    const data =
      await getAnalyticsOverviewService();

    res.status(200).json({
      success: true,
      data,
    });
  });

export const getAnalyticsCharts =
  asyncHandler(async (req, res) => {
    const {
      period = "week",
    } = req.query;

    const data =
      await getAnalyticsChartsService(
        period
      );

    res.status(200).json({
      success: true,
      data,
    });
  });