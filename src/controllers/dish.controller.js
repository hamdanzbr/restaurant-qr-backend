import {
  createDishService,
  deleteDishService,
  getDishByIdService,
  getDishesService,
  updateDishService,
} from "../services/dish.service.js";

export const createDish = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      image,
      price,
      available,
      categoryId,
    } = req.body;

    const dish =
      await createDishService({
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
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create dish",
    });
  }
};

export const getDishes = async (
  req,
  res
) => {
  try {
    const dishes =
      await getDishesService();

    res.status(200).json({
      success: true,
      data: dishes,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
    });
  }
};

export const getDishById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const dish =
      await getDishByIdService(id);

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dish",
    });
  }
};

export const updateDish = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const existingDish =
      await getDishByIdService(id);

    if (!existingDish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    const updatedDish =
      await updateDishService(
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: updatedDish,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update dish",
    });
  }
};

export const deleteDish = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const dish =
      await getDishByIdService(id);

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    await deleteDishService(id);

    res.status(200).json({
      success: true,
      message:
        "Dish deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete dish",
    });
  }
};