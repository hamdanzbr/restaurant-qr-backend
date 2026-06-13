import {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { tableId, notes, items } = req.body;

    // Basic validation
    if (!tableId) {
      return res.status(400).json({
        success: false,
        message: "Table ID is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    const order = await createOrderService({
      tableId,
      notes,
      items,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersService();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const order =
      await getOrderByIdService(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

export const updateOrderStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const order =
        await updateOrderStatusService(
          id,
          status
        );

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update order status",
      });
    }
  };