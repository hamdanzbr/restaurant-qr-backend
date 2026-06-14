import prisma from "../prisma/prismaClient.js";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/category.service.js";
import { getRecentOrdersService } from "../services/dashboard.service.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await createCategoryService(name, description);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Category name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await getCategoryByIdService(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description } = req.body;

    const existingCategory = await getCategoryByIdService(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const updatedCategory = await updateCategoryService(id, name, description);

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Category name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await getCategoryByIdService(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await deleteCategoryService(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const data = await getRecentOrdersService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent orders",
    });
  }
};
