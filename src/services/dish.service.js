import prisma from "../prisma/prismaClient.js";
import ApiError from "../utils/ApiError.js";

export const createDishService = async (data) => {
  return await prisma.dish.create({
    data,
    include: {
      category: true,
    },
  });
};

export const getDishesService = async ({
  search,
  category,
  sortBy = "latest",
}) => {
  const where = {};

  // Search
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Category Filter
  if (category) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: category,
      },
    });

    if (!existingCategory) {
      throw new ApiError(404, "Category not found");
    }

    where.categoryId = existingCategory.id;
  }

  // Sorting
  let orderBy = {
    id: "desc",
  };

  switch (sortBy) {
    case "price_asc":
      orderBy = {
        price: "asc",
      };
      break;

    case "price_desc":
      orderBy = {
        price: "desc",
      };
      break;

    case "name_asc":
      orderBy = {
        name: "asc",
      };
      break;

    case "name_desc":
      orderBy = {
        name: "desc",
      };
      break;

    default:
      orderBy = {
        id: "desc",
      };
  }

  return await prisma.dish.findMany({
    where,

    include: {
      category: true,
    },

    orderBy,
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

export const updateDishService = async (id, data) => {
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

export const deleteDishService = async (id) => {
  return await prisma.dish.delete({
    where: {
      id: Number(id),
    },
  });
};
