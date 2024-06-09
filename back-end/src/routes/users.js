const Users = require("../models/Users");

const express = require("express");
const router = express.Router();

const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
// const salt = 10;

router.get("/set-cookie", (req, res) => {
  res.cookie("user_test", "AshlyTest", { maxAge: 900000, httpOnly: true });
  res.send("Cookie success");
});

router.get("/get-cookie", (req, res) => {
  let userCookie = req.cookies.user_test;
  if (userCookie) {
    res.send(`Cookie value: ${userCookie}`);
  } else {
    res.send("No cookie found");
  }
});

router.post("/register", async (req, res) => {
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

// login to the application
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.json({
      authenticated: false,
      status: "email missing",
      error: "Please enter your email",
    });
  }

  if (!password) {
    return res.json({
      authenticated: false,
      status: "password missing",
      error: "Please enter your password",
    });
  }

  Users.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          password.toString(),
          user.password,
          async (err, response) => {
            if (response) {
              // console.log("USER from DB:", user);

              req.session.username = user.username;
              req.session.email = user.email;
              // await req.session.save();

              //store the token in cookie
              const token = jwt.sign(
                { username: user.username },
                "jwt-secret",
                {
                  expiresIn: "8h",
                }
              );

              // console.log("SESSION MAIL:", req.session.email);
              console.log(req.session);

              res.cookie("access_token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 180), // 180 days
                httpOnly: true,
                secure: true,
                sameSite: "None",
              });

              res.send({
                authenticated: true,
                status: "Login Successful",
                user: user,
              });
            } else {
              return res.status(400).json({
                authenticated: false,
                status: "Email and Password not matching",
                error: "Email and Password are not matching",
              });
            }
          }
        );
      } else {
        res.status(400).json({
          authenticated: false,
          status: "Invalid credentials",
          error: "Invalid credentials",
        });
      }
    })
    .catch((err) => console.log(err));
});

// Logout from the application
router.get("/logout", (req, res) => {
  console.log(req.session);

  res.clearCookie("access_token");
  req.session.destroy();

  res.json({
    authenticated: false,
    status: "Logged out",
  });
});

module.exports = router;
