import prisma from "../prisma/prismaClient.js";

export const getCategoriesService = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "desc",
    },

    include: {
      _count: {
        select: {
          dishes: true,
        },
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,

    dishCount: category._count.dishes,
  }));
};

export const getCategoryStatsService = async () => {
  const totalCategories = await prisma.category.count();

  const totalDishes = await prisma.dish.count();

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          dishes: true,
        },
      },
    },
  });

  const largestCategory = categories.sort(
    (a, b) => b._count.dishes - a._count.dishes,
  )[0];

  return {
    totalCategories,
    totalDishes,

    largestCategory: largestCategory?.name || "N/A",
  };
};

export const createCategoryService = async (name, description) => {
  return await prisma.category.create({
    data: {
      name,
      description,
    },
  });
};

export const getCategoryByIdService = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateCategoryService = async (id, name, description) => {
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

export const deleteCategoryService = async (id) => {
  return await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
};
