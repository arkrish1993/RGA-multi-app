const User = require("../models/User");

/**
 * GET ALL USERS
 * INTERNAL_APP + ADMIN
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "CUSTOMER" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
};

/**
 * GET USER BY ID
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.params.id,
      role: "CUSTOMER",
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({
      error: "Invalid user id",
    });
  }
};

/**
 * ACTIVATE / DEACTIVATE USER
 */
exports.toggleUserStatus = async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    const user = await User.findOne({
      _id: req.params.id,
      role: "CUSTOMER",
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      id: user._id,
      isActive: user.isActive,
    });
  } catch (err) {
    res.status(400).json({
      error: "Failed to update user status",
    });
  }
};
