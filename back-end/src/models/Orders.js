import mongoose from "mongoose";

/*
const decimalField = {
  required: true,
  type: mongoose.Schema.Types.Decimal128,
  // get: mongoose.Schema.Types.Decimal128.toString(),
};
*/

const OrderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: [true, "Please provide User Id"],
    maxlength: [10, "User Id cannot be more than 10 digits"],
  },
  orderId: {
    type: Number,
    required: [true, "Please provide Order Id"],
    maxlength: [10, "Order Id cannot be more than 10 digits"],
  },
  orderAmount: {
    type: mongoose.Types.Decimal128,
    // type: decimalField,
    maxlength: [10, "Order Amount cannot be more than 10 digits"],
  },
  orderStatus: {
    type: Number,
    default: 100 /* 100: Received, 200: Confirmed, 300: Shipped, 400: Delivered */,
    maxlength: [3, "Order Status cannot be more than 3 digits"],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  processed: {
    type: Boolean,
    default: false,
  },
  orderItems: {
    type: Array,
  },
});

module.exports = mongoose.model("orders", OrderSchema);
