import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: [true, "Please provide Order Id"],
    maxlength: [10, "Order Id cannot be more than 10 digits"],
  },
  itemId: {
    type: Number,
    required: [true, "Please provide Item Id"],
    maxlength: [10, "Item Id cannot be more than 10 digits"],
  },
  itemQty: {
    type: Number,
    required: [true, "Please provide Item Qty"],
    maxlength: [5, "Item qty cannot be more than 5 digits"],
  },
  itemPrice: {
    type: Double,
    required: [true, "Please provide Item Price"],
    maxlength: [10, "Item Price cannot be more than 10 digits"],
  },
});

module.exports = mongoose.model("order_items", OrderItemSchema);
