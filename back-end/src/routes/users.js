const Users = require("../models/Users");

const express = require("express");
const router = express.Router();

const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const salt = 10;

router.post("/register", async (req, res) => {
  // await dbConnect();

  try {
    const { username, email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "The email is already existing",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // const userID = savedUser._id;

    return res.json({
      message: "User Created",
      success: true,
      savedUser,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Error occured", error });
  }
});

router.post("/login", async (req, res) => {
  // await dbConnect();

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await Users.findOne({ email: email });

    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);

      if (isMatch) {
        // return user;
        res.send({ success: true });
      } else {
        // throw new Error("Incorrect Email or Password");
        res
          .status(400)
          .send({ success: false, message: "Incorrect Email or Password" });
      }
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "Error occured", error });
  }
});

async function populateCartIds(ids) {
  // await dbConnect();
  return Promise.all(ids.map((id) => Products.findOne({ id })));
}

router.get("/:userId/cart", async (req, res) => {
  /*
  await dbConnection.connect();
  const db = dbConnection.db("vue-node-shopping");
  const user = await db.collection("users").findOne({ id: req.params.userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
  */

  // await dbConnect();

  try {
    const user = await Users.findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

router.post("/:userId/cart", async (req, res) => {
  // await dbConnect();

  const userId = req.params.userId;
  const productId = req.body.id;

  /*
  await dbConnection.connect();
  const db = dbConnection.db("vue-node-shopping");

  const existingUser = await db.collection("users").findOne({ id: userId });
  if (!existingUser) {
    await db.collection("users").insertOne({ id: userId, cartItems: [] });
  }

  await db.collection("users").updateOne(
    { id: userId },
    {
      $addToSet: { cartItems: productId },
    }
  );

  const user = await db.collection("users").findOne({ id: userId });
  */

  const existingUser = await Users.findOne({ id: userId });
  if (!existingUser) {
    await Users.insertOne({ id: userId, cartItems: [] });
  }

  await Users.updateOne(
    { id: userId },
    {
      $addToSet: { cartItems: productId },
    }
  );

  const user = await Users.findOne({ id: userId });

  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

router.delete("/:userId/cart/:productId", async (req, res) => {
  // await dbConnect();

  const userId = req.params.userId;
  const productId = req.params.productId;
  /*
  await dbConnection.connect();
  const db = dbConnection.db("vue-node-shopping");
  await db.collection("users").updateOne(
    { id: userId },
    {
      $pull: { cartItems: productId },
    }
  );

  const user = await db.collection("users").findOne({ id: userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
  */

  await Users.updateOne(
    { id: userId },
    {
      $pull: { cartItems: productId },
    }
  );

  const user = await Users.findOne({ id: userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

router.get("/logout", (req, res) => {
  console.log(req.session);

  res.clearCookie("access_token");
  req.session.destroy();

  res.json({
    authenticated: false,
    status: "Logged out",
    error: "",
  });
});

module.exports = router;
