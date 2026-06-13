import prisma from "../prisma/prismaClient.js";

export const createTableService = async (
  tableNumber
) => {
  return await prisma.restaurantTable.create({
    data: {
      tableNumber,
    },
  });
};

export const getTablesService = async () => {
  return await prisma.restaurantTable.findMany({
    orderBy: {
      tableNumber: "asc",
    },
  });
};

export const getTableByIdService = async (
  id
) => {
  return await prisma.restaurantTable.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateTableService = async (
  id,
  tableNumber
) => {
  return await prisma.restaurantTable.update({
    where: {
      id: Number(id),
    },
    data: {
      tableNumber,
    },
  });
};

export const deleteTableService = async (
  id
) => {
  return await prisma.restaurantTable.delete({
    where: {
      id: Number(id),
    },
  });
};