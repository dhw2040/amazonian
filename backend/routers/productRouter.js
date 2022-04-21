import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const department =
      !req.query.department || req.query.department === "all"
        ? ""
        : req.query.department;

    const keywords =
      !req.query.keywords || req.query.keywords === "all"
        ? ""
        : req.query.keywords;
    const minPrice =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const maxPrice =
      req.query.max && Number(req.query.max) !== Infinity
        ? Number(req.query.max)
        : Infinity;
    const minRating = req.query.rating || 0;
    const sortOrder = req.query.sort || "";
    const page = Number(req.query.page) || 1;
    const itemPerPage = 12;

    const keywordsQuery = { name: { $regex: keywords, $options: "i" } };
    const departmentQuery = department ? { category: department } : {};
    const priceQuery =
      minPrice && maxPrice ? { price: { $gte: minPrice, $lte: maxPrice } } : {};
    const ratingQuery = minRating ? { avgRating: { $gte: minRating } } : {};
    const sortOrderQuery =
      sortOrder === "lowFirst"
        ? { price: 1 }
        : sortOrder === "highFirst"
        ? { price: -1 }
        : sortOrder === "topRated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...keywordsQuery,
      ...departmentQuery,
      ...priceQuery,
      ...ratingQuery,
    });

    const totalPageNum = Math.ceil(count / itemPerPage);

    const products = await Product.find({
      ...keywordsQuery,
      ...departmentQuery,
      ...priceQuery,
      ...ratingQuery,
    })
      .sort(sortOrderQuery)
      .skip((page - 1) * itemPerPage)
      .limit(itemPerPage);

    res.send({ products, page, itemPerPage, totalPageNum });
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const productPopulated = await Product.insertMany(data.products);
    res.send(productPopulated);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.get(
  "/:id/review",
  expressAsyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.id });
    if (reviews) {
      res.send(reviews);
    } else {
      res.status(404).send({ message: "Reviews Not Found" });
    }
  })
);

productRouter.put(
  "/:id/review/update",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      // product.avgRating = req.body.avgRating;
      // product.numReviews = req.body.numReviews;

      const update = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            avgRating: Number(req.body.avgRating),
            numReviews: Number(req.body.numReviews),
          },
        },
        { upsert: true }
      );

      if (update) {
        res.send({
          message: "Product review has been updated",
        });
      } else {
        res.status(404).send({ message: "Product update has failed" });
      }
    } else {
      res
        .status(404)
        .send({ message: "Product Review Update Fail! Product Not Found" });
    }
  })
);

export default productRouter;
