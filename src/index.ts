import dotenv from "dotenv";
import express from "express";

import postRoutes from "./routes/postRoutes";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/posts", postRoutes);

app.listen(port || 8000, () => {
  console.log(`Listening on port ${port}`);
});
