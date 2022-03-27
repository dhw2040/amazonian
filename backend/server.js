import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const port = process.env.port || 5000; // env var

const app = express();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazonian", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product not found" });
//   }
// });

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// }); Static data

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Middleware that handles
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
