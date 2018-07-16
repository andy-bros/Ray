require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = 9001;

const stripe = require("./controllers/stripe");

app.use(express.json());
app.use(cors());

// app.post("/charge", stripe);

app.listen(PORT, () => {
  console.log(`"${PORT} Shelby Drive look alive, look alive."
  -Drizzy`);
});
