import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/categories",
  categoryRoutes
);

app.get("/", (req, res) => {
  res.json({
    message: "Restaurant API Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});