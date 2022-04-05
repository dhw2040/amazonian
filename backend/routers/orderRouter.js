import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.items.length === 0) {
      return res.status(401).send({ message: "Cart is empty." });
    } else {
      const order = new Order({
        items: req.body.items,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemSubtotal: req.body.itemSubtotal,
        shippingPrice: req.body.shippingPrice,
        total: req.body.total,
        tax: req.body.tax,
        final: req.body.final,
        user: req.user._id,
      });
      const newOrder = await order.save();
      return res
        .status(201)
        .send({ message: "Created new order.", order: newOrder });
    }
  })
);

export default orderRouter;
