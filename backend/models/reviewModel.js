import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, //if not available, anonymous
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    location: { type: String },
    isVerified: { type: Boolean }, // if user has purchased the item, true, otherwise false.
    helpful: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    abuse: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);

export default Review;
