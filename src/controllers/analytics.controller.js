import {
    getAnalyticsChartsService,
  getAnalyticsOverviewService,
} from "../services/analytics.service.js";

export const getAnalyticsOverview =
  async (req, res) => {
    try {
      const data =
        await getAnalyticsOverviewService();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch analytics",
      });
    }
  };

  export const getAnalyticsCharts =
  async (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch analytics charts",
      });
    }
  };