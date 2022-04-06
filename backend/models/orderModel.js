import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderedItems: [
      {
        name: { type: String, required: true },
        qty: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // type is linked to mongoose productModel Schema
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemSubtotal: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    final: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // type is linked to mongoose Usermodel Schema
    isPaid: { type: Boolean, default: false },
    dateOfPayment: { type: Date },
    isDelivered: { type: Boolean, default: false },
    expectedDelivery: { type: Date, required: true },
    dateOfDelivery: { type: Date },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
