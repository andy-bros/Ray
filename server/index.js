require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  { json } = require("body-parser"),
  PORT = process.env.PORT || 3001,
  stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(json());
app.use(cors());

app.post("/charge", (req, res) => {
  console.log(req);

  // stripe.charges
  //   .create({
  //     amount: +req.body.amount,
  //     currency: "usd",
  //     description: "An Example Charge",
  //     source: req.body.token
  //   })
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Magic Happens on port ${PORT}`);
});
