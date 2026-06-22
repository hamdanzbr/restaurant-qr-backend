import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import dishRoutes from "./routes/dish.routes.js";
import tableRoutes from "./routes/table.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import uploadRoutes from "./routes/upload.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setIO } from "./socket/socket.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);

app.use("/api/dishes", dishRoutes);

app.use("/api/tables", tableRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/upload", uploadRoutes);


app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Restaurant API Running",
  });
});

const PORT = process.env.PORT||5000;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

setIO(io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
