require("dotenv").config();
const express = require("express"),
  app = express(),
  cors = require("cors"),
  { json } = require("body-parser"),
  PORT = process.env.PORT || 3001;

app.use(json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Magic Happens on port ${PORT}`);
});
