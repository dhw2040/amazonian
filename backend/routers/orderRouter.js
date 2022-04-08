import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.send(orders);
    } else {
      res.send({
        message: "You haven't made any order with Amazonian Yet. Go shopping!",
      });
    }
  })
);

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
        eligibleReturnDate: req.body.eligibleReturnDate,
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

orderRouter.put(
  "/:id/pay",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.dateOfPayment = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const update = await order.save();
      res.send({ message: "Order has been paid", order: update });
    } else {
      return res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
