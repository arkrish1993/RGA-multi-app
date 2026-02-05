const express = require("express");
const app = express();

const appResolver = require("./middleware/appResolver");

const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-APP-ID"],
  }),
);
app.use(appResolver);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));

module.exports = app;
