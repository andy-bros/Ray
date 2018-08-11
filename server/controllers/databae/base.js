let products = [];

const getProducts = (req, res) => {
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
      .catch(console.log);
  }
};

module.exports = {
  getProducts
};
