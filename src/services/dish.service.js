import prisma from "../prisma/prismaClient.js";

export const createDishService = async (data) => {
  return await prisma.dish.create({
    data,
    include: {
      category: true,
    },
  });
};

export const getDishesService = async () => {
  return await prisma.dish.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getDishByIdService = async (id) => {
  return await prisma.dish.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });
};

export const updateDishService = async (
  id,
  data
) => {
  return await prisma.dish.update({
    where: {
      id: Number(id),
    },
    data,
    include: {
      category: true,
    },
  });
};

export const deleteDishService = async (
  id
) => {
  return await prisma.dish.delete({
    where: {
      id: Number(id),
    },
  });
};