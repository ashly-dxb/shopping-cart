require("dotenv").config();

// ##### import all the API endpoints #####
const users = require("./routes/users");
const products = require("./routes/products");
const usercart = require("./routes/usercart");
const stripe = require("./routes/stripe");
const orders = require("./routes/orders");

const connection = require("./dbconnection");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// import path from "path";

connection();

const app = express();
app.use(express.json());

/* copied from react todo  app */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://ashly3.vercel.app",
      "https://shopping-cart-deployment.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "secret.ckname",
    cookie: {
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
/* copied from react todo  app */

// app.use("/images", express.static(path.join(__dirname, "../assets")));
// app.use(
//   express.static(path.resolve(__dirname, "../dist"), {
//     maxAge: "1y",
//     etag: false,
//   })
// );

// include all the API endpoint groups
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/cart", usercart);
app.use("/api/stripe", stripe);
app.use("/api/orders", orders);

/* all routing */
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log("Server is Listening on PORT: " + port);
});
