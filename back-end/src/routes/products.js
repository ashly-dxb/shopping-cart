const Products = require("../models/Products");

const express = require("express");
const router = express.Router();

router.get("/list", async (req, res) => {
  // console.log("Prod List call");

  // await Products.updateMany({}, [{ $set: { price: { $toInt: "$price" } } }]);
  // console.log("UPADTE DONE!!!");

  try {
    console.log("Products List :::: ", Products);
    const products = await Products.find({});

    res.json(products);
  } catch (error) {
    console.log("Product List error: ", error);

    res.status(400).json({ success: false });
  }
});

router.get("/details/:productId", async (req, res) => {
  const productId = req.params.productId;

  console.log("Product Details :::: ", productId);

  try {
    const product = await Products.findOne({ id: productId });
    console.log("Product Details 22:::: ", product);
    res.json(product);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
