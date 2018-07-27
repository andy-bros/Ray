require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = 9001,
  { getMessageSermons } = require("./controllers/aws/utils"),
  massive = require("massive"),
  { getProducts } = require("./controllers/databae/base"),
  session = require("express-session"),
  stripe = require("stripe")(process.env.STRIPE_KEY),
  sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1814400000 //3 Weeks
    }
  };

app.use(express.json());
app.use(cors());
app.use(session(sess));
// if (app.get("env") === "production") {
//   app.set("trust proxy", 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }
massive(process.env.DB_CONNECTION)
  .then(db => app.set("db", db))
  .catch(() => console.log("error"));

app.get("/api/getusercart", (req, res) => {
  // console.log(req.session.cookie);
  // if (!req.session.cookie.cart) {
  //   console.log(req.session.cookie);
  //   req.session.cookie.cart = ["dogs"];
  //   res.status(200).json(req.session);
  // } else {
  //   console.log("lol");
  //   req.session.cookie.cart.push("pups");
  //   res.status(200).json(req.session.cookie.cart);
  // }
});
app.post("/api/addusercart", (req, res) => {
  if (req.session.cart) {
    console.log("if");
    req.session.cart.push(req.body.items);
    res.status(200).json(req.session.cart);
  } else {
    console.log("else if");
    req.session.cart = [req.body.items];
    res.status(200).json(req.session.cart);
  }
});

app.post("/charge", (req, res) => {
  //make customer
  //make sure the customers description is the email and name
  //email and description
  //check if the amount is stationary or hand inputed
  //check if its a monthly payment or one time
  //make subscription with users returned customer id

  // console.log(req.body);
  // let updatedAmount = req.body.amount + "00";
  // stripe.charges
  //   .create({
  //     amount: +updatedAmount,
  //     currency: "usd",
  //     description: "An Example Charge",
  //     source: req.body.token
  //   })
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
  stripe.plans.create(
    {
      amount: 5000,
      interval: "month",
      product: {
        name: "Gold special"
      },
      currency: "usd"
    },
    function(err, plan) {
      if (err) console.log(err);
      else if (plan) console.log(plan);
    }
  );
});

app.get("/api/products", getProducts);

app.get("/api/getmessages", getMessageSermons);

app.listen(PORT, () => {
  console.log(`"${PORT} Shelby Drive look alive, look alive."
  -Drizzy`);
});
