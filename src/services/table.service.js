import prisma from "../prisma/prismaClient.js";
import QRCode from "qrcode";

export const createTableService = async (tableNumber) => {
  const table = await prisma.restaurantTable.create({
    data: {
      tableNumber,
    },
  });

  const qrUrl = `${process.env.FRONTEND_URL}/customer/${table.id}`;

  const qrCode = await QRCode.toDataURL(qrUrl);

  const updatedTable = await prisma.restaurantTable.update({
    where: {
      id: table.id,
    },
    data: {
      qrCode,
    },
  });

  return updatedTable;
};

export const getTablesService = async () => {
  return await prisma.restaurantTable.findMany({
    orderBy: {
      tableNumber: "asc",
    },
  });
};

export const getTableByIdService = async (id) => {
  return await prisma.restaurantTable.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateTableService = async (id, tableNumber) => {
  return await prisma.restaurantTable.update({
    where: {
      id: Number(id),
    },
    data: {
      tableNumber,
    },
  });
};

export const deleteTableService = async (id) => {
  return await prisma.restaurantTable.delete({
    where: {
      id: Number(id),
    },
  });
};
