import express from "express";
import dotenv from "dotenv";

/* import connectDatabase from "./db/connection"; */

dotenv.config();

/* connectDatabase(); */

const app = express();

app.get("/login", (req, res) => {
  res.send("You are logged in");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
