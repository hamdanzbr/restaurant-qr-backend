import {
  createTableService,
  getTablesService,
  getTableByIdService,
  updateTableService,
  deleteTableService,
} from "../services/table.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const createTable =
  asyncHandler(async (req, res) => {
    const { tableNumber } = req.body;

    const table =
      await createTableService(
        tableNumber
      );

    res.status(201).json({
      success: true,
      data: table,
    });
  });

export const getTables =
  asyncHandler(async (req, res) => {
    const tables =
      await getTablesService();

    res.status(200).json({
      success: true,
      data: tables,
    });
  });

export const getTableById =
  asyncHandler(async (req, res) => {
    const table =
      await getTableByIdService(
        req.params.id
      );

    if (!table) {
      throw new ApiError(
        404,
        "Table not found"
      );
    }

    res.status(200).json({
      success: true,
      data: table,
    });
  });

export const updateTable =
  asyncHandler(async (req, res) => {
    const table =
      await getTableByIdService(
        req.params.id
      );

    if (!table) {
      throw new ApiError(
        404,
        "Table not found"
      );
    }

    const updatedTable =
      await updateTableService(
        req.params.id,
        req.body.tableNumber
      );

    res.status(200).json({
      success: true,
      data: updatedTable,
    });
  });

export const deleteTable =
  asyncHandler(async (req, res) => {
    const table =
      await getTableByIdService(
        req.params.id
      );

    if (!table) {
      throw new ApiError(
        404,
        "Table not found"
      );
    }

    await deleteTableService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Table deleted successfully",
    });
  });