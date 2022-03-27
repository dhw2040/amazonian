import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const port = process.env.port || 5000; // env var
dotenv.config(); // use .env file

const app = express();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazonian", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Middleware that handles error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
