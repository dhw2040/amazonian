import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import { calcAverage, isAuth } from "../utils.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/create-review",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const existProduct = await Product.findById(req.body.product);
    const existReview = await Review.findOne(
      { product: req.body.product },
      { user: req.user._id }
    );
    if (existProduct) {
      //   const numReviews = await Review.count({ product: req.body.product });

      if (existReview) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      } else {
        const review = new Review({
          product: req.body.product,
          user: req.user._id,
          title: req.body.title,
          rating: req.body.rating,
          content: req.body.content,
          location: req.body.location,
          isVerified: req.body.isVerified,
        });
        const newReview = await review.save();

        const reviewAggregate = await Review.aggregate([
          {
            $match: {
              product: req.body.product,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$rating" },
              count: { $sum: 1 },
            },
          },
        ]);
        const numReviews = reviewAggregate.count + 1;
        const currentAvg = existProduct.avgRating;
        const avg = currentAvg
          ? currentAvg
          : reviewAggregate.total
          ? reviewAggregate.total
          : 0;
        const avgRating = calcAverage(numReviews, avg, req.body.rating);

        return res.status(201).send({
          message: "Created new review",
          review: newReview,
          avgRating,
          numReviews,
        });
      }
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default reviewRouter;
