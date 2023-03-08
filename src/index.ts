import dotenv from "dotenv";
import express from "express";

import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

import prismaMiddleware from "./middlewares/prisma";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

prismaMiddleware();

app.use(express.json());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.listen(port || 8000, () => {
  console.log(`Listening on port ${port}`);
});
