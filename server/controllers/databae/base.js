const getProducts = (req, res) => {
  req.app
    .get("db")
    .getallproducts()
    .then(results => res.status(200).json(results))
    .catch(() => console.log("error"));
};

module.exports = {
  getProducts
};
