const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    personalDetails: {
      fullname: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    shippingDetails: {
      address: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
    },
    shippingCostAndMethod: {
      shippingMethod: {
        type: String,
        required: true,
      },
      shippingCost: {
        type: Number,
        required: true,
      },
    },
    paymentDetails: {
      totalCost: Number,
      transaction: String,
      last4: String,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Cancel", "Processing", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Easy_Food_Order", orderSchema);
module.exports = Order;
