const Products = require("../models/Products");

const express = require("express");
const router = express.Router();

// For file(product image) upload
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/uploaded"); // configure the upload directory in server
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// var fs = require("fs");

/* ************************************************************************** */
router.get("/list", async (req, res) => {
  // await Products.updateMany({}, [{ $set: { price: { $toInt: "$price" } } }]);
  // console.log("UPADTE DONE!!!");

  var mySort = { id: 1 };

  try {
    const products = await Products.find({}).sort(mySort);
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

/* ************************************************************************** */
/* Create a product */
router.post("/create", upload.array("uploadedfiles"), async (req, res) => {
  try {
    const { name, price, description, uploadedfiles } = req.body;

    console.log("imageObj: ", uploadedfiles);

    const product = await Products.findOne({ name });
    if (product) {
      return res.json({
        success: false,
        message: "The product name is already existing",
      });
    }

    var productId = Math.floor(1000 + Math.random() * 9999);

    const newProduct = new Products({
      id: productId,
      name,
      price,
      description,
      imageUrl: "/images/" + req.files[0].originalname,
    });

    const savedProduct = await newProduct.save();

    return res.json({
      message: "Product created",
      success: true,
      savedProduct,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Error occured", error });
  }
});

/* ************************************************************************** */
/* Modify a product */
router.put("/modify/:id", upload.array("uploadedfiles"), async (req, res) => {
  try {
    const { name, price, description, uploadedfiles } = req.body;
    const productId = req.params.id;

    console.log("Modify - req.files: ", req.files);

    let imagePath;
    if (req.files.length > 0) {
      imagePath = "/images/" + req.files[0].originalname;
    }

    console.log("Modify - imageObj: ", uploadedfiles);

    const product = await Products.updateOne(
      { id: productId },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          imageUrl: imagePath,
        },
      }
    );

    return res.json({
      message: "Product updated",
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Error occured", error });
  }
});

module.exports = router;
