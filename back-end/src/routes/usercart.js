const UserCart = require("../models/UserCart");
const Products = require("../models/Products");

const express = require("express");
const router = express.Router();

// retrieve cart list
router.get("/list", async (req, res) => {
  try {
    console.log("Cart List START :::: ", Products);
    console.log("Products List :::: ", Products);
    const products = await Products.find({});

    res.json(products);
  } catch (error) {
    console.log("Product List error: ", error);

    res.status(400).json({ success: false });
  }

  /*
  try {
    console.log("Cart List START :::: ", UserCart);
    const userCarts = await UserCart.find({});
    console.log("Cart List :", userCarts);
    res.json(userCarts);
  } catch (error) {
    console.log("Cart error: ", error);
    res.status(400).json({ success: false });
  }
  */
});

// retrieve cart details by userID
router.get("/details/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserCart.findOne({ id: userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

// Add item to specified user's cart
router.post("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.id;

  const existingUser = await UserCart.findOne({ id: userId });
  if (!existingUser) {
    await UserCart.insertOne({ id: userId, cartItems: [] });
  }

  await UserCart.updateOne(
    { id: userId },
    {
      $addToSet: { cartItems: parseInt(productId) },
    }
  );

  const user = await UserCart.findOne({ id: userId });

  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

// Delete specified item from specified user's cart
router.delete("/:userId/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  console.log("userId:", userId);
  console.log("productId:", productId);

  const result = await UserCart.updateOne(
    { id: userId },
    {
      $pull: { cartItems: parseInt(productId) },
    }
  );

  console.log("DEL result:", result);

  const user = await UserCart.findOne({ id: userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

async function populateCartIds(ids) {
  return Promise.all(ids.map((id) => Products.findOne({ id })));
}

module.exports = router;
