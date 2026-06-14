import prisma from "../prisma/prismaClient.js";

export const createOrderService = async ({
  tableId,
  notes,
  items,
  customerName,
  customerMobile
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
    const dish = dishes.find(
      (dish) => dish.id === item.dishId
    );

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
          const dish = dishes.find(
            (dish) => dish.id === item.dishId
          );

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

export const updateOrderStatusService = async (
  id,
  status
) => {
  return await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });
};