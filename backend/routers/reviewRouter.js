import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import { isAuth } from "../utils.js";

const reviewRouter = express.Router();

reviewRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const productId = req.query.product;
    const sortOrder = req.query.sort;
    const verified = req.query.verified;
    const rating =
      req.query.rating !== "all" ? Number(req.query.rating) : "all";
    const page = req.query.page;
    const itemPerPage = 10;

    // const keywords =
    //   !req.query.keywords || req.query.keywords === "all"
    //     ? ""
    //     : req.query.keywords;
    // const keywordsQuery = { name: { $regex: keywords, $options: "i" } };

    if (productId) {
      const verifiedQuery = verified ? { isVerified: { $eq: true } } : {};
      const ratingQuery = rating !== "all" ? { rating: { $eq: rating } } : {};
      const sortOrderQuery =
        sortOrder === "top"
          ? { helpful: 1 }
          : sortOrder === "recent"
          ? { _id: -1 }
          : {};

      const topPositive = await Review.find({ product: productId })
        .sort({ helpful: 1, rating: -1 })
        .limit(1);
      const topCritical = await Review.find({ product: productId })
        .sort({ helpful: 1, rating: 1 })
        .limit(1);

      const searchCount = await Review.count({
        product: productId,
        ...verifiedQuery,
        ...ratingQuery,
      });

      const reviews = await Review.find({
        product: productId,
        ...verifiedQuery,
        ...ratingQuery,
      })
        .sort(sortOrderQuery)
        .skip((page - 1) * itemPerPage)
        .limit(itemPerPage);

      res.send({
        topPositive: topPositive[0],
        topCritical: topCritical[0],
        reviews,
        page,
        searchCount,
      });
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

reviewRouter.post(
  "/create-review",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const existProduct = await Product.findById(req.body.product);
    const reviewCount = await Review.count({ product: req.body.product });
    const existUserReview = await Review.findOne({
      product: req.body.product,
      user: req.user._id,
    });

    if (existProduct) {
      if (existUserReview) {
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

        if (!newReview) {
          return res
            .status(404)
            .send({ message: "Creating new review has failed" });
        } else {
          const numReviews = existProduct.numReviews;
          const avgRating = existProduct.avgRating;
          const currentTotal = reviewCount * avgRating;

          const newAvg = (currentTotal + req.body.rating) / (numReviews + 1);
          const newNumReviews = numReviews + 1;

          return res.status(201).send({
            success: true,
            message:
              "You have successfully created new review for the product.",
            product: String(req.user._id),
            newAvg,
            newNumReviews,
          });
        }
      }
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

reviewRouter.put(
  "/edit-review",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const existProduct = await Product.findById(req.body.product);
    const reviewCount = await Review.count({ product: req.body.product });
    const userReview = await Review.findOne({
      product: req.body.product,
      user: req.user._id,
    });
    if (existProduct) {
      if (userReview) {
        const previousRating = userReview.rating;
        const numReviews = existProduct.numReviews;
        const avgRating = existProduct.avgRating;
        const currentTotal = reviewCount * avgRating;

        const newAvg =
          (currentTotal - previousRating + req.body.rating) / numReviews;

        userReview.user = req.user._id;
        userReview.title = req.body.title;
        userReview.rating = req.body.rating;
        userReview.content = req.body.content;
        userReview.location = req.body.location;

        const updateReview = await userReview.save();

        if (!updateReview) {
          return res
            .status(404)
            .send({ message: "Updating your review has failed" });
        } else {
          return res.status(201).send({
            success: true,
            message:
              "You have successfully updated your review for the product.",
            review: updateReview,
            newAvg,
            newNumReviews: numReviews,
          });
        }
      } else {
        return res
          .status(400)
          .send({ message: "You have not submitted any review." });
      }
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

reviewRouter.delete(
  "/delete-review",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const existProduct = await Product.findById(req.body.product);
    const reviewCount = await Review.count({ product: req.body.product });
    const userReview = await Review.findOne({
      product: req.body.product,
      user: req.user._id,
    });
    if (existProduct) {
      if (userReview) {
        const previousRating = userReview.rating;
        const numReviews = existProduct.numReviews;
        const avgRating = existProduct.avgRating;
        const currentTotal = reviewCount * avgRating;

        let newAvg;
        if (numReviews === 1) {
          newAvg = 0;
        } else {
          newAvg = (currentTotal - previousRating) / (numReviews - 1);
        }

        const removedReview = await userReview.remove();
        if (removedReview) {
          return res.status(201).send({
            message: "You have successfully deleted your review.",
            success: true,
            newAvg,
            newNumReviews: numReviews - 1,
            review: removedReview,
          });
        } else {
          return res
            .status(400)
            .send({ message: "Deleting request has failed" });
        }
      } else {
        return res
          .status(400)
          .send({ message: "There is no review that you have submitted" });
      }
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default reviewRouter;
