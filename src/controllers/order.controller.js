import {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} from "../services/order.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createOrder =
  asyncHandler(async (req, res) => {
    const order =
      await createOrderService(
        req.body
      );

    res.status(201).json({
      success: true,
      data: order,
    });
  });

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await getOrdersService();

  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await getOrderByIdService(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await updateOrderStatusService(id, status);

  res.status(200).json({
    success: true,
    data: order,
  });
});
