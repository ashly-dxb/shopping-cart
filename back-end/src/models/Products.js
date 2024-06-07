import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please enter ID"],
    maxlength: [10, "ID cannot be more than 10 characters"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
    maxlength: [10, "Price cannot be more than 10 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please enter Image URL/Path"],
    maxlength: [100, "Image URL cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
    maxlength: [2000, "Description cannot be more than 2000 characters"],
  },
});

// export default mongoose.models.products ||  mongoose.model("products", ProductSchema);
module.exports = mongoose.model("products", ProductSchema);
