require("dotenv").config();

// const products = require("./routes/products");
// const users = require("./routes/users");

// import all the API endpoints
const users = require("./routes/users");
const products = require("./routes/products");
const usercart = require("./routes/usercart");

const connection = require("./dbconnection");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

import path from "path";

// import Users from "./models/Users";
// import Products from "./models/Products";

connection();

const app = express();
app.use(express.json());

/*copied from react todo  app */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://shopping-cart-deployment.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*copied from react todo  app */

app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use(
  express.static(path.resolve(__dirname, "../dist"), {
    maxAge: "1y",
    etag: false,
  })
);

// include all the API endpoint groups
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/cart", usercart);

/* all routing */

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is Listening on PORT: " + port);
});
