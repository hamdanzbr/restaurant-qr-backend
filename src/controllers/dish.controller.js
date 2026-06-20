import {
  createDishService,
  deleteDishService,
  getDishByIdService,
  getDishesService,
  updateDishService,
} from "../services/dish.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createDish = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    price,
    available,
    categoryId,
  } = req.body;

  const dish = await createDishService({
    name,
    description,
    image,
    price,
    available,
    categoryId,
  });

  res.status(201).json({
    success: true,
    data: dish,
  });
});

export const getDishes = asyncHandler(
  async (req, res) => {
    const data =
      await getDishesService(
        req.query
      );

    res.status(200).json({
      success: true,
      data,
    });
  }
);

export const getDishById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dish = await getDishByIdService(id);

  if (!dish) {
    throw new ApiError(404, "Dish not found");
  }

  res.status(200).json({
    success: true,
    data: dish,
  });
});

export const updateDish = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingDish = await getDishByIdService(id);

  if (!existingDish) {
    throw new ApiError(404, "Dish not found");
  }

  const updatedDish = await updateDishService(id, req.body);

  res.status(200).json({
    success: true,
    data: updatedDish,
  });
});

export const deleteDish = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingDish = await getDishByIdService(id);

  if (!existingDish) {
    throw new ApiError(404, "Dish not found");
  }

  await deleteDishService(id);

  res.status(200).json({
    success: true,
    message: "Dish deleted successfully",
  });
});