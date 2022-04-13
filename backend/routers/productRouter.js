import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const department =
      req.query.department !== "all" ? req.query.department : "";
    const keywords = req.query.keywords !== "all" ? req.query.keywords : "";
    const minPrice =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const maxPrice =
      req.query.max && Number(req.query.max) !== Infinity
        ? Number(req.query.max)
        : Infinity;
    const minRating = req.query.rating;
    const sortOrder = req.query.sort || "";
    const page = Number(req.query.page) || 1;
    const itemPerPage = 12;

    const keywordsQuery = { name: { $regex: keywords, $options: "i" } };
    const departmentQuery = department ? { category: department } : {};
    const priceQuery =
      minPrice && maxPrice ? { price: { $gte: minPrice, $lte: maxPrice } } : {};
    const ratingQuery = minRating ? { rating: { $gte: minRating } } : {};
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
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.remove({}); // remove all users to prevent duplicate
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

export default productRouter;
