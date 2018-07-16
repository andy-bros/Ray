const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeCharge = (req, res, next) => {
  console.log("hit");
  stripe.charges
    .create({
      amount: +req.body.amount,
      currency: "usd",
      description: "An Example Charge",
      source: req.body.token
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
module.exports = {
  stripeCharge
};
