// Script to create an admin user

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/User");

(async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const hashed = await bcrypt.hash("12345", 10);

  await User.create({
    email: "admin@xyz.com",
    password: hashed,
    role: "ADMIN",
  });

  console.log("Admin user created");

  process.exit();
})();
