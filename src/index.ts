import dotenv from "dotenv";
import express from "express";

import postRoutes from "./routes/postRoutes";

dotenv.config();

const app = express();

app.use("/posts", postRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
