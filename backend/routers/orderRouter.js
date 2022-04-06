import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderedItems.length === 0) {
      return res.status(401).send({ message: "Cart is empty." });
    } else {
      const order = new Order({
        orderedItems: req.body.orderedItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemSubtotal: req.body.itemSubtotal,
        shippingPrice: req.body.shippingPrice,
        total: req.body.total,
        tax: req.body.tax,
        final: req.body.final,
        expectedDelivery: req.body.expectedDelivery,
        user: req.user._id,
      });
      const newOrder = await order.save();
      return res
        .status(201)
        .send({ message: "Created new order.", order: newOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      return res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
