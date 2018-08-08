let products = [];

const getProducts = (req, res) => {
  console.log("hit");
  // console.log(req.app.get);
  if (products.length) {
    res.status(200).json(products);
  } else {
    req.app
      .get("db")
      .getallproducts()
      .then(results => {
        products = results;
        res.status(200).json(results);
      })
      .catch(() => console.log("error"));
  }
};

module.exports = {
  getProducts
};
