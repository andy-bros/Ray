require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = 9001,
  { getAWS } = require("./controllers/aws");

app.use(express.json());
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

app.get("/api/getmp3pdf", getAWS);

app.listen(PORT, () => {
  console.log(`"${PORT} Shelby Drive look alive, look alive."
  -Drizzy`);
});
