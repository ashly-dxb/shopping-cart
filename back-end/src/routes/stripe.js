import Stripe from "stripe";
const express = require("express");
const router = express.Router();

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

/* ************************************************************************** */
/* To fetch the secret before a payment */
router.post("/payment_intent", async (req, res) => {
  const { amount } = req.body; // Should calculate in server side

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aed",
    });

    res.status(200).send({ secret: paymentIntent.client_secret });
  } catch (error) {
    // console.log("error", error);
    res.status(500).send("error" + error);
  }
});

/* ************************************************************************** */
/* handling webhook */
router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.END_POINT_SECRET
      );
      // console.log("type", event);
    } catch (err) {
      // console.log("type2", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!");
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types...
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

module.exports = router;
