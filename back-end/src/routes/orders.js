const Orders = require("../models/Orders");

const express = require("express");
const router = express.Router();

/* ************************************************************************** */
// Create an order
router.post("/create", async (req, res) => {
  var orderId = Math.floor(100000 + Math.random() * 99999);

  var userId = parseInt(req.body.userId);
  var orderAmount = parseFloat(req.body.orderAmount);
  var orderItems = req.body.orderItems;

  var insertItems = [];

  if (orderItems) {
    orderItems.forEach(function (item) {
      insertItems.push({
        itemId: parseInt(item.id),
        itemName: item.name,
        itemPrice: parseFloat(item.price),
        itemQty: parseInt(item.quantity),
      });
    });
  }

  const newOrder = new Orders({
    orderId,
    orderAmount,
    userId,
    orderItems: insertItems,
  });

  try {
    const savedOrder = await newOrder.save();
    // const savedOrder = await Orders.insert({
    //   userId: userId,
    //   orderId: orderId,
    //   orderAmount: orderAmount,
    // });

    res.json({ success: true, savedOrder: savedOrder });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

/* ************************************************************************** */
// Fetch an order by Order ID
router.get("/order/:orderId", async (req, res) => {
  const orderId = parseInt(req.params.orderId);

  try {
    const order = await Orders.findOne({ orderId: orderId });
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

/* ************************************************************************** */
// Fetch all orders
router.get("/list", async (req, res) => {
  var mySort = { orderDate: -1 };

  try {
    const orders = await Orders.find({}).sort(mySort);
    res.json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

/* ************************************************************************** */
// Fetch all orders of a specific user by User ID
router.get("/user/:userId", async (req, res) => {
  // console.log("fetching my orders", parseInt(req.params.userId));
  const userId = parseInt(req.params.userId);

  var mySort = { orderDate: -1 };

  try {
    // const orders = await Orders.find({ userId: userId }).sort(mySort);
    const orders = await Orders.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $set: {
          orderAmount: {
            $toDouble: "$orderAmount",
          },
        },
      },
      {
        $sort: { orderDate: -1 },
      },

      { $limit: 10 },
    ]);

    res.json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
