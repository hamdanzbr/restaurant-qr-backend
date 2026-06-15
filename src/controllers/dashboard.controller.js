import {
  getDashboardSummaryService,
  getOrdersOverviewService,
  getPopularDishesService,
  getRevenueChartService,
} from "../services/dashboard.service.js";

import asyncHandler from "../utils/asyncHandler.js";

export const getDashboardSummary =
  asyncHandler(async (req, res) => {
    const data =
      await getDashboardSummaryService();

    res.status(200).json({
      success: true,
      data,
    });
  });

export const getRevenueChart =
  asyncHandler(async (req, res) => {
    const { period = "week" } =
      req.query;

    const data =
      await getRevenueChartService(
        period
      );

    res.status(200).json({
      success: true,
      data,
    });
  });

export const getOrdersOverview =
  asyncHandler(async (req, res) => {
    const data =
      await getOrdersOverviewService();

    res.status(200).json({
      success: true,
      data,
    });
  });

export const getPopularDishes =
  asyncHandler(async (req, res) => {
    const data =
      await getPopularDishesService();

    res.status(200).json({
      success: true,
      data,
    });
  });