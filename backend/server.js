import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

const port = process.env.port || 5000; // env var
dotenv.config(); // use .env file

const app = express();
app.use(express.json()); // middleware that parses json data in the body of request
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazonian", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_USER_API || "sb");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// Middleware that handles error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
