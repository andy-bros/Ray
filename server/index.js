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
      // maxAge: 1814400000 //3 Weeks //I am leaving this blank so that
      //I can store the users created customer id from stripe onto sessions
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
  // check if its a monthly payment or one time
  if (req.body.checked === "one-time") {
    //should I check to see if the user is a customer?
    //should i create a customer
    let updatedAmount = req.body.amount + "00";
    stripe.charges
      .create({
        amount: +updatedAmount,
        currency: "usd",
        description: `A one time payment for ${req.body.name}`,
        source: req.body.token
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    return;
  } else if (req.body.checked === "monthly") {
    let plan = () => {
      // check if the amount is stationary or hand imputed
      if (req.body.amount === "25") {
        return process.env.TWO_FIVE;
      } else if (req.body.amount === "50") {
        return process.env.FIVE_ZERO;
      } else if (req.body.amount === "100") {
        return process.env.ONE_HUNDRED;
      } else if (req.body.amount === "200") {
        return process.env.TWO_HUNDRED;
      } else if (req.body.amount === "500") {
        return process.env.FIVE_HUNDRED;
      } else {
        stripe.plans.create(
          {
            amount: +req.body.amount + "00",
            interval: "month",
            product: {
              name: `${req.body.name}'s plan`
            },
            currency: "usd"
          },
          function(err, plan) {
            // asynchronously called
            return plan.product;
          }
        );
      }
    };
    if (!req.session.customerid) {
      //make new customer
      stripe.customers.create(
        {
          description: req.body.name,
          email: req.body.email,
          source: req.body.token
        },
        function(err, customer) {
          // asynchronously called
          //the returned customer id is to be charged
          //store the customer id on sessions
          if (err) console.log("ERROR", err);
          else if (customer) {
            console.log(customer.id);
            req.session.customerid = customer.id;
            stripe.subscriptions.create(
              {
                customer: customer.id,
                items: [
                  {
                    plan
                  }
                ]
              }
              // , function(err, subscription) {
              //     // asynchronously called
              //   }
            );
          }
        }
      );
    } else {
      stripe.subscriptions.create(
        {
          customer: req.session.customerid,
          items: [
            {
              plan
            }
          ]
        }
        // , function(err, subscription) {
        //     // asynchronously called
        //   }
      );
      // charge the customerid
    }
  }
});

app.get("/api/products", getProducts);

app.get("/api/getmessages", getMessageSermons);

app.listen(PORT, () => {
  console.log(`"${PORT} Shelby Drive look alive, look alive."
  -Drizzy`);
});
