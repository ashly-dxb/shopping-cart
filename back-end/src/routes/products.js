const Products = require("../models/Products");

const express = require("express");
const router = express.Router();

/* ************************************************************************** */
router.get("/list", async (req, res) => {
  // await Products.updateMany({}, [{ $set: { price: { $toInt: "$price" } } }]);
  // console.log("UPADTE DONE!!!");

  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

/* ************************************************************************** */
router.get("/details/:productId", async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const product = await Products.findOne({ id: productId });
    res.json(product);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
