import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import dishRoutes from "./routes/dish.routes.js";
import tableRoutes from "./routes/table.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);

app.use("/api/dishes", dishRoutes);

app.use("/api/tables", tableRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/dashboard",dashboardRoutes)

app.use("/api/analytics",analyticsRoutes)

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Restaurant API Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
