import {
  createTableService,
  getTablesService,
  getTableByIdService,
  updateTableService,
  deleteTableService,
} from "../services/table.service.js";

export const createTable = async (
  req,
  res
) => {
  try {
    const { tableNumber } = req.body;

    const table =
      await createTableService(
        tableNumber
      );

    res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message:
          "Table number already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create table",
    });
  }
};

export const getTables = async (
  req,
  res
) => {
  try {
    const tables =
      await getTablesService();

    res.status(200).json({
      success: true,
      data: tables,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tables",
    });
  }
};

export const getTableById = async (
  req,
  res
) => {
  try {
    const table =
      await getTableByIdService(
        req.params.id
      );

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    res.status(200).json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch table",
    });
  }
};

export const updateTable = async (
  req,
  res
) => {
  try {
    const table =
      await getTableByIdService(
        req.params.id
      );

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update table",
    });
  }
};

export const deleteTable = async (
  req,
  res
) => {
  try {
    const table =
      await getTableByIdService(
        req.params.id
      );

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    await deleteTableService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Table deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete table",
    });
  }
};