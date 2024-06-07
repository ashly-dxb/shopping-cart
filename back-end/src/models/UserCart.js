import mongoose from "mongoose";

const UserCartSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  cartItems: {
    type: Array,
  },
});

// export default mongoose.models.user_cart || mongoose.model("user_register", UserCartSchema);
module.exports = mongoose.model("user_carts", UserCartSchema);
