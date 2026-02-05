const Order = require("../models/Order");
// const Product = require("../models/Product");

/**
 * CREATE ORDER
 * CUSTOMER_APP only
 */
exports.create = async (req, res) => {
  try {
    const order = await Order.create({
      customerId: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });
    // for (const item in order.items) {
    //   const { _id, quantity } = item;
    //   const product = await Product.findById(_id);
    //   product.stock -= quantity;
    //   await product.save();
    // }
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create order",
      details: err.message,
    });
  }
};

/**
 * GET ALL ORDERS
 * INTERNAL_APP -> all orders
 * CUSTOMER_APP -> only own orders
 */
exports.list = async (req, res) => {
  try {
    if (req.appId === "CUSTOMER_APP") {
      const orders = await Order.find({ customerId: req.user._id });
      return res.json(orders);
    }

    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
};

/**
 * GET ORDER BY ID
 * CUSTOMER_APP -> only own order
 * INTERNAL_APP -> any order
 */
exports.getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    if (
      req.appId === "CUSTOMER_APP" &&
      order.customerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({
      error: "Invalid order ID",
    });
  }
};

/**
 * UPDATE ORDER
 * CUSTOMER_APP -> only own order (before fulfillment)
 * INTERNAL_APP -> any order
 */
exports.update = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    if (
      req.appId === "CUSTOMER_APP" &&
      order.customerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    // Allowed updates
    order.items = req.body.items ?? order.items;
    order.totalAmount = req.body.totalAmount ?? order.totalAmount;

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({
      error: "Failed to update order",
      details: err.message,
    });
  }
};

/**
 * DELETE ORDER
 * INTERNAL_APP only
 */
exports.remove = async (req, res) => {
  try {
    if (req.appId === "CUSTOMER_APP") {
      return res.status(403).json({
        error: "Customers cannot delete orders",
      });
    }

    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: "Failed to delete order",
    });
  }
};
