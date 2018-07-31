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
    saveUninitialized: true
    // cookie: {
    //   // maxAge: 1814400000 //3 Weeks //I am leaving this blank so that
    //   //I can store the users created customer id from stripe onto sessions
    // }
  };

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);
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
//TOP LEVEL MIDDLEWARE THAT CREATES CART
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});
app.post("/api/addusercart", (req, res) => {
  req.session.cart.push(req.body.items);
  res.status(200).json(req.session.cart);
});

app.post("/charge", (req, res) => {
  // this checks to see if its a monthly payment or one time
  if (req.body.checked === "one-time") {
    //a customer is not needed for a one time purchase so we directly create the charge to the account
    let updatedAmount = req.body.amount + "00";
    stripe.charges
      .create({
        amount: +updatedAmount,
        currency: "usd",
        description: `A one time payment for ${req.body.name}`,
        source: req.body.token,
        receipt_email: req.body.email
      })
      .then(res =>
        //send back to the front end to let know that everything is successful
        console.log(res)
      )
      .catch(err =>
        //send back to the front end to let know that an error occurred

        console.log(err)
      );
    return;
  } else if (req.body.checked === "monthly") {
    let subPlan;
    let planForSub = () => {
      //this is just getting us the plan for the user
      // check if the amount is the selected stationary or hand imputed
      //if it is hand imputed then we create a plan for it
      if (req.body.amount === "25") {
        subPlan = process.env.TWO_FIVE;
      } else if (req.body.amount === "50") {
        subPlan = process.env.FIVE_ZERO;
      } else if (req.body.amount === "100") {
        subPlan = process.env.ONE_HUNDRED;
      } else if (req.body.amount === "200") {
        subPlan = process.env.TWO_HUNDRED;
      } else if (req.body.amount === "500") {
        subPlan = process.env.FIVE_HUNDRED;
      } else {
        stripe.plans.create(
          {
            amount: +req.body.amount + "00",
            interval: "month",
            product: {
              name: `${req.body.name}'s ${req.body.amount} plan`
            },
            currency: "usd"
          },
          function(err, plan) {
            // asynchronously called
            console.log(plan.id);
            subPlan = plan.id;
          }
        );
      }
    };
    if (!req.session.customer) {
      console.log("customer is not present");
      planForSub();
      //make new customer
      stripe.customers.create(
        {
          description: req.body.name,
          email: req.body.email,
          source: req.body.token
        },
        function(err, customers) {
          // asynchronously called
          //the returned customer id is to be charged
          //store the customer id on sessions
          if (err) console.log("ERROR", err);
          else if (customers) {
            console.log("CUSTOMER ID", customers.id);
            //this is where the customer id needs to save to sessions
            req.session.customer = customers.id;
            stripe.subscriptions.create(
              {
                customer: customers.id,
                //
                //
                //
                //NEEEDS TO BE FIXED

                items: [{ plan: subPlan }]

                // items: [{ plan: newPlan }]
              }
              // , function(err, subscription) {
              //     // asynchronously called
              //   }
            );
          }
        }
      );
    } else {
      console.log("customer is on sessions");
      stripe.subscriptions.create(
        {
          customer: req.session.customer,
          description: req.body.name,
          //
          //
          //
          //NEEEDS TO BE FIXED
          items: [{ plan: subPlan }]
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
