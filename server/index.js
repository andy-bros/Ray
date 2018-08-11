require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = 9001,
  { getMessageSermons } = require("./controllers/aws/utils"),
  massive = require("massive"),
  { getProducts } = require("./controllers/databae/base"),
  session = require("express-session"),
  ses = require(`${__dirname}/controllers/aws/ses`);
stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));
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
app.use((req, _, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});
app.get("/api/get-cart", ({ session: { cart } }, res) => {
  res.status(200).send(cart);
});
app.post("/api/add-to-cart", (req, res) => {
  const { item } = req.body;
  const { cart } = req.session;
  const index = cart.findIndex(e => e.product_id == item.product_id);
  if (!cart[index]) {
    cart.push({ ...item, quantity: 1 });
  } else {
    cart[index].quantity++;
  }
  // console.log(req.session.cart);
  let email = req.session.cart.map((e, i) => {
    return { item: e.product_name, quantity: e.quantity };
  });
  console.log(email);
  res.status(200).send(cart);
});
app.delete("/api/delete-from-cart/:id", (req, res) => {
  const i = req.session.cart.findIndex(e => e.product_id == req.params.id);
  req.session.cart.splice(i, 1);
  console.log(req.session.cart);
  res.status(200).send(req.session.cart);
});
app.put("/api/update-cart", (req, res) => {
  //THIS DOESNT WORK
  // let { cart } = req.session;
  // cart = req.body.newCart;
  // res.status(200).send(cart);
  //THIS WORKS
  req.session.cart = req.body.newCart;
  res.status(200).send(req.session.cart);
});
app.delete("/api/empty-cart", (req, res) => {
  req.session.cart = []; //DONT KILL SESSION. JUST EMPTY CART;
  console.log(req.session.cart);
  res.status(200).send(req.session.cart);
});

app.post("/charge", (req, res) => {
  // this checks to see if its a monthly payment or one time
  if (req.body.checked === "one-time") {
    //a customer is not needed for a one time purchase so we directly create the charge to the account

    let updatedAmount = req.body.amount.split(".")[0] + "00";
    stripe.charges
      .create({
        amount: +updatedAmount,
        currency: "usd",
        description: `A one time payment for ${req.body.name}`,
        source: req.body.token,
        receipt_email: req.body.email
        //check for email
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

app.post("/api/send-email", ses.emailRayOrder);

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`"${PORT} Shelby Drive look alive, look alive."
  -Drizzy`);
});
