import prisma from "../prisma/prismaClient.js";

export const getDashboardSummaryService =
  async () => {
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const startOfYesterday =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );

    // Today's Orders
    const todayOrders =
      await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startOfToday,
          },
        },
      });

    // Yesterday's Orders
    const yesterdayOrders =
      await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startOfYesterday,
            lt: startOfToday,
          },
        },
      });

    const revenueToday =
      todayOrders.reduce(
        (sum, order) => sum + order.total,
        0
      );

    const revenueYesterday =
      yesterdayOrders.reduce(
        (sum, order) => sum + order.total,
        0
      );

    const completedToday =
      todayOrders.filter(
        (order) =>
          order.status === "DELIVERED"
      ).length;

    const completedYesterday =
      yesterdayOrders.filter(
        (order) =>
          order.status === "DELIVERED"
      ).length;

    const avgOrderValueToday =
      todayOrders.length > 0
        ? revenueToday /
          todayOrders.length
        : 0;

    const avgOrderValueYesterday =
      yesterdayOrders.length > 0
        ? revenueYesterday /
          yesterdayOrders.length
        : 0;

    const activeOrders =
      await prisma.order.count({
        where: {
          status: {
            in: [
              "PENDING",
              "PREPARING",
              "READY",
            ],
          },
        },
      });

    const getPercentageChange = (
      current,
      previous
    ) => {
      if (previous === 0) {
        return current > 0 ? 100 : 0;
      }

      return Number(
        (
          ((current - previous) /
            previous) *
          100
        ).toFixed(1)
      );
    };

    return {
      revenue: {
        value: revenueToday,
        change:
          getPercentageChange(
            revenueToday,
            revenueYesterday
          ),
        trend:
          revenueToday >= revenueYesterday
            ? "up"
            : "down",
      },

      orders: {
        value: todayOrders.length,
        change:
          getPercentageChange(
            todayOrders.length,
            yesterdayOrders.length
          ),
        trend:
          todayOrders.length >=
          yesterdayOrders.length
            ? "up"
            : "down",
      },

      completedOrders: {
        value: completedToday,
        change:
          getPercentageChange(
            completedToday,
            completedYesterday
          ),
        trend:
          completedToday >=
          completedYesterday
            ? "up"
            : "down",
      },

      averageOrderValue: {
        value: Number(
          avgOrderValueToday.toFixed(2)
        ),
        change:
          getPercentageChange(
            avgOrderValueToday,
            avgOrderValueYesterday
          ),
        trend:
          avgOrderValueToday >=
          avgOrderValueYesterday
            ? "up"
            : "down",
      },

      activeOrders: {
        value: activeOrders,
      },
    };
  };

  export const getRevenueChartService =
  async (period = "week") => {
    const today = new Date();

    let startDate = new Date();

    switch (period) {
      case "month":
        startDate.setDate(
          today.getDate() - 30
        );
        break;

      case "year":
        startDate.setFullYear(
          today.getFullYear() - 1
        );
        break;

      default:
        startDate.setDate(
          today.getDate() - 6
        );
    }

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

    const revenueMap = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(
        today.getDate() - (6 - i)
      );

      const label =
        date.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        );

      revenueMap[label] = 0;
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

      if (revenueMap[label] !== undefined) {
        revenueMap[label] += order.total;
      }
    });

    return Object.entries(
      revenueMap
    ).map(([day, revenue]) => ({
      day,
      revenue,
    }));
  };

  export const getOrdersOverviewService =
  async () => {
    const [
      pending,
      preparing,
      ready,
      delivered,
      cancelled,
    ] = await Promise.all([
      prisma.order.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.order.count({
        where: {
          status: "PREPARING",
        },
      }),

      prisma.order.count({
        where: {
          status: "READY",
        },
      }),

      prisma.order.count({
        where: {
          status: "DELIVERED",
        },
      }),

      prisma.order.count({
        where: {
          status: "CANCELLED",
        },
      }),
    ]);

    return [
      {
        status: "Pending",
        count: pending,
      },
      {
        status: "Preparing",
        count: preparing,
      },
      {
        status: "Ready",
        count: ready,
      },
      {
        status: "Delivered",
        count: delivered,
      },
      {
        status: "Cancelled",
        count: cancelled,
      },
    ];
  };

  export const getPopularDishesService =
  async () => {
    const orderItems =
      await prisma.orderItem.findMany({
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
          image: item.dish.image,
          quantitySold: 0,
          revenue: 0,
        };
      }

      dishesMap[dishId].quantitySold +=
        item.quantity;

      dishesMap[dishId].revenue +=
        item.quantity * item.price;
    });

    return Object.values(dishesMap)
      .sort(
        (a, b) =>
          b.quantitySold -
          a.quantitySold
      )
      .slice(0, 5);
  };

export const getRecentOrdersService =
  async () => {
    const orders =
      await prisma.order.findMany({
        take: 10,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          table: true,
        },
      });

    return orders.map((order) => ({
      id: order.id,

      customerName:
        order.customerName,

      customerMobile:
        order.customerMobile,

      tableNumber:
        order.table.tableNumber,

      total: order.total,

      status: order.status,

      createdAt:
        order.createdAt,
    }));
  };