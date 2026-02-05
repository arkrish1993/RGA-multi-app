const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!["ADMIN", "CUSTOMER"].includes(role)) {
    return res.status(400).json({
      error: "Invalid role",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
  });

  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  if (!user || !user.isActive) {
    return res.status(401).json({
      error: "Account disabled or invalid",
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.json({ token });
};
