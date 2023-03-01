import mongoose from "mongoose";

export default function connectDatabase() {
  if (process.env.DB_URI !== undefined) {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.DB_URI)
      .then((conn) => {
        console.log(`Database connected: ${conn.connection.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  }
}
