const UserCart = require("../models/UserCart");
const Products = require("../models/Products");

const express = require("express");
const router = express.Router();

// retrieve cart list
router.get("/list", async (req, res) => {
  try {
    const userCart = await UserCart.find({});
    res.json(userCart);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

// retrieve cart details by userID
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserCart.findOne({ id: userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

// retrieve cart items as an array by userID
router.get("/itemlist/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserCart.findOne({ id: userId });
    const cartItems = user?.cartItems || [];
    res.json(cartItems);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

// Add item to specified user's cart
router.post("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.body.product_id);

  const existingCart = await UserCart.findOne({ id: userId });

  if (existingCart) {
    await UserCart.updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: parseInt(productId) },
      }
    );
  } else {
    try {
      const newUserCart = new UserCart({
        id: userId,
        cartItems: [],
      });

      const savedUserCart = await newUserCart.save();
    } catch (error) {
      return res.status(400).send({ success: false, message: "Insert error" });
    }
  }

  const userCart = await UserCart.findOne({ id: userId });

  const populatedCart = await populateCartIds(userCart?.cartItems || []);
  res.json(populatedCart);
});

// Delete specified item from specified user's cart
router.delete("/:userId/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  const result = await UserCart.updateOne(
    { id: userId },
    {
      $pull: { cartItems: parseInt(productId) },
    }
  );

  const user = await UserCart.findOne({ id: userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

async function populateCartIds(ids) {
  return Promise.all(ids.map((id) => Products.findOne({ id })));
}

module.exports = router;
