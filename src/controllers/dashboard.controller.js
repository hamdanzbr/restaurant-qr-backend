import {
  getDashboardSummaryService,
  getOrdersOverviewService,
  getPopularDishesService,
  getRevenueChartService,
} from "../services/dashboard.service.js";

export const getDashboardSummary =
  async (req, res) => {
    try {
      const data =
        await getDashboardSummaryService();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard summary",
      });
    }
  };

  export const getRevenueChart =
  async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch revenue chart",
      });
    }
  };

  export const getOrdersOverview =
  async (req, res) => {
    try {
      const data =
        await getOrdersOverviewService();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch orders overview",
      });
    }
  };

  export const getPopularDishes =
  async (req, res) => {
    try {
      const data =
        await getPopularDishesService();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch popular dishes",
      });
    }
  };