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
    const userCart = await UserCart.findOne({ id: userId });

    const cartItems = userCart?.cartItems || [];
    const populatedCart = await populateCartIds(cartItems);

    res.json(populatedCart);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

// retrieve cart products as an array by userID
router.get("/itemlist/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserCart.findOne({ id: userId });
    const cartItems = user?.cartItems || [];

    let productIDs = cartItems.map((item) => item.id);
    res.json(productIDs);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

// Add specified item to specified user's cart
router.post("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.body.product_id);

  const existingCart = await UserCart.findOne({ id: userId });

  if (existingCart) {
    const existingProduct = await UserCart.aggregate([
      { $match: { id: userId } },
      { $unwind: "$cartItems" },
      { $match: { "cartItems.id": productId } },
    ]);

    // console.log("existingCart check", existingProduct);

    if (existingProduct.length > 0) {
      try {
        await UserCart.updateOne(
          { id: userId, "cartItems.id": productId },
          { $inc: { "cartItems.$.quantity": 1 } }
        );
        // console.log("existingProduct updating");
      } catch (error) {
        return res
          .status(400)
          .send({ success: false, message: "Update error 1" });
      }
    } else {
      try {
        await UserCart.updateOne(
          { id: userId },
          { $addToSet: { cartItems: { id: productId, quantity: 1 } } }
        );

        // console.log("newProduct adding");
      } catch (error) {
        return res
          .status(400)
          .send({ success: false, message: "Update error 2" });
      }
    }
  } else {
    try {
      const newUserCart = new UserCart({
        id: userId,
        cartItems: [{ id: parseInt(productId), quantity: 1 }],
      });

      const savedUserCart = await newUserCart.save();
      // console.log(savedUserCart);
    } catch (error) {
      return res.status(400).send({ success: false, message: "Insert error" });
    }
  }

  const userCart = await UserCart.findOne({ id: userId });

  const cartItems = userCart?.cartItems || [];
  // const productIDs = cartItems.map((item) => item.id);

  const populatedCart = await populateCartIds(cartItems);
  res.json(populatedCart);
});

// Add specified item to specified user's cart
router.post("/:userId/changeqty", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.body.product_id);
  const changeType = req.body.change_type; // DECREASE_QTY/INCREASE_QTY

  const existingCart = await UserCart.findOne({ id: userId });

  if (existingCart) {
    const existingProduct = await UserCart.aggregate([
      { $match: { id: userId } },
      { $unwind: "$cartItems" },
      { $match: { "cartItems.id": productId } },
    ]);

    const increaseQty = changeType == "INCREASE_QTY" ? 1 : -1; // increase or decrease 1 qty

    // console.log("qty check", existingProduct[0].cartItems.quantity);
    // console.log("qty check 2", existingProduct[0].cartItems.quantity === 1);

    if (
      existingProduct[0].cartItems.quantity === 1 &&
      changeType == "DECREASE_QTY"
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Minimum qty reached" });
    }

    // console.log("changeType:", increaseQty, changeType);

    if (existingProduct.length > 0) {
      try {
        await UserCart.updateOne(
          { id: userId, "cartItems.id": productId },
          { $inc: { "cartItems.$.quantity": increaseQty } }
        );
        // console.log("existingProduct updating");
      } catch (error) {
        return res
          .status(400)
          .send({ success: false, message: "Failed to update qty" });
      }
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Product not found in cart" });
    }
  } else {
    return res
      .status(400)
      .send({ success: false, message: "User Cart not found" });
  }

  const userCart = await UserCart.findOne({ id: userId });
  const cartItems = userCart?.cartItems || [];
  const populatedCart = await populateCartIds(cartItems);
  res.json(populatedCart);
});

// Delete specified item from specified user's cart
router.delete("/:userId/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  const result = await UserCart.updateOne(
    { id: userId },
    {
      $pull: { cartItems: { id: parseInt(productId) } },
    },
    { new: true }
  );

  // const user = await UserCart.findOne({ id: userId });
  const userCart = await UserCart.findOne({ id: userId });

  const cartItems = userCart?.cartItems || [];
  // const productIDs = cartItems.map((item) => item.id);

  const populatedCart = await populateCartIds(cartItems);
  res.json(populatedCart);
});

// generic function for fetching each product details in the cart
async function populateCartIds(cartItems) {
  const quantities = cartItems.map((item) => item.quantity);
  const productIDs = cartItems.map((item) => item.id);
  // console.log("productIDs:", productIDs);
  // console.log("quantities:", quantities);

  var arrayResult = Promise.all(
    productIDs.map(async (id, index) => {
      const product = await Products.findOne({ id }).lean().exec(); // lean() to make the result object a JS object
      const updatedProduct = { ...product, quantity: quantities[index] }; //push quantities to the product data
      return updatedProduct;
    })
  );

  return arrayResult;
}

module.exports = router;
