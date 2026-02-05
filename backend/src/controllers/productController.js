const Product = require("../models/Product");

/**
 * CREATE PRODUCT
 * Internal App only (controlled via feature + role guards in routes)
 */
exports.create = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create product",
      details: err.message,
    });
  }
};

/**
 * GET ALL PRODUCTS
 * Internal + Customer (read-only for customers)
 */
exports.list = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

/**
 * GET PRODUCT BY ID
 */
exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({
      error: "Invalid product ID",
    });
  }
};

/**
 * UPDATE PRODUCT
 * Internal App only
 */
exports.update = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
      },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({
      error: "Failed to update product",
      details: err.message,
    });
  }
};

/**
 * DELETE PRODUCT
 * Internal App only
 */
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: "Failed to delete product",
    });
  }
};
