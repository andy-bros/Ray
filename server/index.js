require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = 9001,
  { getMessageSermons } = require("./controllers/aws/utils"),
  massive = require("massive"),
  { getProducts } = require("./controllers/databae/base"),
  session = require("express-session"),
  sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1814400000, //3 Weeks
      cart: []
    }
  };

app.use(express.json());
app.use(cors());
app.use(session(sess));
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
massive(process.env.DB_CONNECTION)
  .then(db => app.set("db", db))
  .catch(() => console.log("error"));

app.get("/api/getusercart", (req, res) => {
  if (sess.cookie.cart.length === 0) {
    sess.cookie.cart.push("dogs");
    res.status(200).json(sess.cookie.cart);
  } else {
    sess.cookie.cart.push("dogs");
    res.status(200).json(sess.cookie.cart);
  }
});

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

app.get("/api/products", getProducts);

app.get("/api/getmessages", getMessageSermons);

app.listen(PORT, () => {
  console.log(`"${PORT} Shelby Drive look alive, look alive."
  -Drizzy`);
});
