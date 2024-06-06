require("dotenv").config();

import express from "express";
import path from "path";

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import Users from "./models/Users";
import Products from "./models/Products";
// import { URLSearchParams } from "url";

const connection = {};
async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB database.");
  connection.isConnected = db.connections[0].readyState;
}

const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use(
  express.static(path.resolve(__dirname, "../dist"), {
    maxAge: "1y",
    etag: false,
  })
);

app.get("/api/hello", async (req, res) => {
  await dbConnect();

  const products = await Products.find({}).toArray();
  res.send(products);
});

app.post("/api/register", async (req, res) => {
  await dbConnect();

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

app.post("/api/login", async (req, res) => {
  await dbConnect();

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

app.get("/api/products", async (req, res) => {
  await dbConnect();

  // await Products.updateMany({}, [{ $set: { price: { $toInt: "$price" } } }]);
  // console.log("UPADTE DONE!!!");

  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  await dbConnect();

  try {
    const product = await Products.findOne({ id: productId });

    console.log("productId: 333", product);

    res.json(product);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

async function populateCartIds(ids) {
  await dbConnect();
  return Promise.all(ids.map((id) => Products.findOne({ id })));
}

app.get("/api/users/:userId/cart", async (req, res) => {
  /*
  await dbConnection.connect();
  const db = dbConnection.db("vue-node-shopping");
  const user = await db.collection("users").findOne({ id: req.params.userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
  */

  await dbConnect();

  try {
    const user = await Users.findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

app.post("/api/users/:userId/cart", async (req, res) => {
  await dbConnect();

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

app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
  await dbConnect();

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

/* all routing */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is Listening on PORT: " + port);
});
