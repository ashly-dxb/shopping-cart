require("dotenv").config();

import express from "express";
import { MongoClient } from "mongodb";
import path from "path";

const password = process.env.MONGODB_PASS;

const dbURL =
  "mongodb+srv://ashlythomas:" +
  password +
  "@cluster0.nobtacb.mongodb.net/vue-node-shopping?retryWrites=true&w=majority";

// const dbURL = "mongodb://localhost:27017";

const client = new MongoClient(dbURL);

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
  await client.connect();
  const db = client.db("vue-node-shopping");
  const products = await db.collection("products").find({}).toArray();
  res.send(products);
});

app.get("/api/products", async (req, res) => {
  await client.connect();
  const db = client.db("vue-node-shopping");
  const products = await db.collection("products").find({}).toArray();
  res.send(products);
});

app.get("/api/products/:productId", async (req, res) => {
  await client.connect();
  const db = client.db("vue-node-shopping");

  const productId = req.params.productId;
  const product = await db.collection("products").findOne({ id: productId });
  res.json(product);
});

async function populateCartIds(ids) {
  await client.connect();
  const db = client.db("vue-node-shopping");
  return Promise.all(
    ids.map((id) => db.collection("products").findOne({ id }))
  );
}

app.get("/api/users/:userId/cart", async (req, res) => {
  await client.connect();
  const db = client.db("vue-node-shopping");
  const user = await db.collection("users").findOne({ id: req.params.userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

app.post("/api/users/:userId/cart", async (req, res) => {
  await client.connect();
  const db = client.db("vue-node-shopping");

  const userId = req.params.userId;
  const productId = req.body.id;

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

  const user = await db.collection("users").findOne({ id: req.params.userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
  await client.connect();
  const db = client.db("vue-node-shopping");

  const userId = req.params.userId;
  const productId = req.params.productId;

  await db.collection("users").updateOne(
    { id: userId },
    {
      $pull: { cartItems: productId },
    }
  );

  const user = await db.collection("users").findOne({ id: req.params.userId });
  const populatedCart = await populateCartIds(user?.cartItems || []);
  res.json(populatedCart);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is Listening on PORT: " + port);
});
