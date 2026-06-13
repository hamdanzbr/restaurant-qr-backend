import prisma from "../prisma/prismaClient.js";

export const getCategoriesService = async () => {
  return await prisma.category.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

export const createCategoryService = async (
  name,
  description
) => {
  return await prisma.category.create({
    data: {
      name,
      description,
    },
  });
};

export const getCategoryByIdService = async (
  id
) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateCategoryService = async (
  id,
  name,
  description
) => {
  return await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      description,
    },
  });
};

export const deleteCategoryService = async (
  id
) => {
  return await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
};