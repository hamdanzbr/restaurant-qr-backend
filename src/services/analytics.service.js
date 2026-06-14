import prisma from "../prisma/prismaClient.js";

export const getAnalyticsOverviewService = async () => {
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  const totalOrders = await prisma.order.count();

  const averageOrderValue = await prisma.order.aggregate({
    _avg: {
      total: true,
    },
  });

  const orders = await prisma.order.findMany({
    select: {
      createdAt: true,
    },
  });

  const hourMap = {};

  orders.forEach((order) => {
    const hour = order.createdAt.getHours();

    hourMap[hour] = (hourMap[hour] || 0) + 1;
  });

  let peakHour = null;
  let maxOrders = 0;

  for (const hour in hourMap) {
    if (hourMap[hour] > maxOrders) {
      maxOrders = hourMap[hour];
      peakHour = Number(hour);
    }
  }

  const peakOrderingHour = peakHour !== null ? `${peakHour}:00` : "N/A";

  const orderItems = await prisma.orderItem.findMany({
    include: {
      dish: true,
    },
  });

  const dishesMap = {};

  orderItems.forEach((item) => {
    const dishId = item.dish.id;

    if (!dishesMap[dishId]) {
      dishesMap[dishId] = {
        id: item.dish.id,
        name: item.dish.name,
        quantitySold: 0,
        revenue: 0,
      };
    }

    dishesMap[dishId].quantitySold += item.quantity;

    dishesMap[dishId].revenue += item.quantity * item.price;
  });

  const topSellingDishes = Object.values(dishesMap)
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 5);

  const categoryItems = await prisma.orderItem.findMany({
    include: {
      dish: {
        include: {
          category: true,
        },
      },
    },
  });

  const categoriesMap = {};

  categoryItems.forEach((item) => {
    const category = item.dish.category;

    if (!categoriesMap[category.id]) {
      categoriesMap[category.id] = {
        id: category.id,
        name: category.name,
        orders: 0,
        revenue: 0,
      };
    }

    categoriesMap[category.id].orders += item.quantity;

    categoriesMap[category.id].revenue += item.quantity * item.price;
  });

  const popularCategories = Object.values(categoriesMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    metrics: {
      totalRevenue: totalRevenue._sum.total || 0,

      totalOrders,

      averageOrderValue: Number((averageOrderValue._avg.total || 0).toFixed(2)),

      peakOrderingHour,
    },

    popularCategories,

    topSellingDishes,
  };
};

export const getAnalyticsChartsService =
  async (period = "week") => {
    const today = new Date();

    let days = 7;

    if (period === "month") {
      days = 30;
    }

    if (period === "year") {
      days = 365;
    }

    const startDate = new Date();

    startDate.setDate(
      today.getDate() - (days - 1)
    );

    const orders =
      await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        select: {
          total: true,
          createdAt: true,
        },
      });

    const chartMap = {};

    for (let i = 0; i < days; i++) {
      const date = new Date();

      date.setDate(
        today.getDate() -
          ((days - 1) - i)
      );

      const label =
        date.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        );

      chartMap[label] = {
        revenue: 0,
        orders: 0,
      };
    }

    orders.forEach((order) => {
      const label =
        order.createdAt.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        );

      if (chartMap[label]) {
        chartMap[label].revenue +=
          order.total;

        chartMap[label].orders += 1;
      }
    });

    const revenueTrend =
      Object.entries(chartMap).map(
        ([label, value]) => ({
          label,
          revenue: value.revenue,
        })
      );

    const ordersTrend =
      Object.entries(chartMap).map(
        ([label, value]) => ({
          label,
          orders: value.orders,
        })
      );

    return {
      revenueTrend,
      ordersTrend,
    };
  };