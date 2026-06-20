import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  getCategoryStatsService,
  updateCategoryService,
} from "../services/category.service.js";
import { getRecentOrdersService } from "../services/dashboard.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getCategoriesService();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await createCategoryService(name, description);

  res.status(201).json({
    success: true,
    data: category,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await getCategoryByIdService(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, description } = req.body;

  const existingCategory = await getCategoryByIdService(id);

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  const updatedCategory = await updateCategoryService(id, name, description);

  res.status(200).json({
    success: true,
    data: updatedCategory,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingCategory = await getCategoryByIdService(id);

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  await deleteCategoryService(id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export const getRecentOrders =asyncHandler(async(req,res)=>{
      const data = await getRecentOrdersService();
    res.status(200).json({
      success: true,
      data,
    });

})

export const getCategoryStats =
  asyncHandler(async (req, res) => {
    const data =
      await getCategoryStatsService();

    res.status(200).json({
      success: true,
      data,
    });
  });