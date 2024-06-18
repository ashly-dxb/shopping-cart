const Users = require("../models/Users");

const express = require("express");
const router = express.Router();

const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
// const salt = 10;

import sendEmail from "../mailLib";

/* ************************************************************************** */
/*
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
*/

/* ************************************************************************** */
/* Sign-up a new user account */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "The email is already registered",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    var userId = Math.floor(1000 + Math.random() * 9999);

    const newUser = new Users({
      userId,
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

/* ************************************************************************** */
// login to the application
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.json({
      authenticated: false,
      status: "Email missing",
      error: "Please enter your email",
    });
  }

  if (!password) {
    return res.json({
      authenticated: false,
      status: "Password missing",
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
              req.session.username = user.username;
              req.session.email = user.email;
              // await req.session.save();

              //store the token in cookie
              const token = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET,
                {
                  expiresIn: "8h",
                }
              );

              // console.log("SESSION MAIL:", req.session.email);
              // console.log(req.session);

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
                status: "Loggin Failed",
                error: "Invalid Email / Password",
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

/* ************************************************************************** */
// Logout from the application
router.get("/logout", (req, res) => {
  // console.log(req.session);

  res.clearCookie("access_token");
  req.session.destroy();

  res.json({
    authenticated: false,
    status: "Logged out",
  });
});

/* ************************************************************************** */
// List of users
router.get("/list", async (req, res) => {
  try {
    const users = await Users.find({});
    res.json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

/* ************************************************************************** */
// forgot password email
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .json({
          message: "Email not found",
          success: false,
        })
        .status(400);
    }

    const secret = process.env.JWT_SECRET + user.password;

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "10m",
    });

    const link = `http://localhost:8080/ResetPassword/${user._id.toString()}/${token}`;
    // console.log(link);
    // console.log("check mailtrap for the new mail...");

    // send verification email
    const mailResp = await sendEmail({
      email: user.email,
      userID: user._id.toString(),
      token,
    });

    return res.json({
      message: "Email sent successfully",
      success: true,
      mailResp,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to send mail",
      success: false,
    });
  }
});

/* ************************************************************************** */
// reset password form
router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const user = await Users.findOne({ _id: id });
  if (!user) {
    return res
      .json({
        message: "User not found",
        success: false,
      })
      .status(400);
  }

  const secret = process.env.JWT_SECRET + user.password;

  try {
    const verify = jwt.verify(token, secret);
    res.send("Verified");
  } catch (error) {
    res.status(400).json({
      message: "Failed to verify",
      success: false,
    });
  }
});

/* ************************************************************************** */
// reset password form submit
router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await Users.findOne({ _id: id });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }

  const secret = process.env.JWT_SECRET + user.password;

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    // const verify = jwt.verify(token, secret);
    // res.send("verified");

    await Users.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    return res.json({
      message: "Password updated",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update password",
      success: false,
    });
  }
});

/* ************************************************************************** */
// Change password form submit
router.post("/change-password/:id", async (req, res) => {
  const userID = parseInt(req.params.id);
  const { password } = req.body;

  const user = await Users.findOne({ userId: userID });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }

  const secret = process.env.JWT_SECRET + user.password;

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    // const verify = jwt.verify(token, secret);
    // res.send("verified");

    await Users.updateOne(
      { userId: userID },
      { $set: { password: hashedPassword } }
    );
    return res.json({
      message: "Password change successful",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to change password",
      success: false,
    });
  }
});

module.exports = router;
