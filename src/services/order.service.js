import prisma from "../prisma/prismaClient.js";
import ApiError from "../utils/ApiError.js";

export const createOrderService = async ({
  tableId,
  notes,
  items,
  customerName,
  customerMobile,
}) => {
  // Get dishes from DB
  const dishes = await prisma.dish.findMany({
    where: {
      id: {
        in: items.map((item) => item.dishId),
      },
    },
  });

  if (dishes.length !== items.length) {
    throw new Error("One or more dishes not found");
  }

  // Calculate total
  let total = 0;

  items.forEach((item) => {
    const dish = dishes.find((dish) => dish.id === item.dishId);

    total += dish.price * item.quantity;
  });

  // Create Order + OrderItems
  const order = await prisma.order.create({
    data: {
      tableId,
      notes,
      total,
      customerName,
      customerMobile,
      items: {
        create: items.map((item) => {
          const dish = dishes.find((dish) => dish.id === item.dishId);

          return {
            dishId: item.dishId,
            quantity: item.quantity,
            price: dish.price,
          };
        }),
      },
    },

    include: {
      table: true,
      items: {
        include: {
          dish: true,
        },
      },
    },
  });

  return order;
};
export const getOrdersService = async () => {
  return await prisma.order.findMany({
    include: {
      table: true,
      items: {
        include: {
          dish: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderByIdService = async (id) => {
  return await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      table: true,
      items: {
        include: {
          dish: true,
        },
      },
    },
  });
};

// export const updateOrderStatusService = async (
//   id,
//   status
// ) => {
//   return await prisma.order.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       status,
//     },
//   });
// };

export const updateOrderStatusService = async (id, status) => {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const validTransitions = {
    PENDING: ["PREPARING"],
    PREPARING: ["READY"],
    READY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  const allowedStatuses = validTransitions[order.status];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(
      400,
      `Cannot change status from ${order.status} to ${status}`,
    );
  }

  return await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });
};

export const getOrderStatsService = async () => {
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const totalOrders = await prisma.order.count({
    where: {
      createdAt: {
        gte: startOfToday,
      },
    },
  });

  const pendingOrders = await prisma.order.count({
    where: {
      status: "PENDING",
      createdAt: {
        gte: startOfToday,
      },
    },
  });

  const preparingOrders = await prisma.order.count({
    where: {
      status: "PREPARING",
      createdAt: {
        gte: startOfToday,
      },
    },
  });

  const readyOrders = await prisma.order.count({
    where: {
      status: "READY",
      createdAt: {
        gte: startOfToday,
      },
    },
  });

  const deliveredOrders = await prisma.order.count({
    where: {
      status: "DELIVERED",
      createdAt: {
        gte: startOfToday,
      },
    },
  });

  return {
    totalOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    deliveredOrders,
  };
};
