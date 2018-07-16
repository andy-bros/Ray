import React from "react";
import { Switch, Route } from "react-router-dom";

export default (
  /*
    Here is the backbone for our routes.
   */
  <Switch>
    <Route exact path="/" component={() => <h1>Home Page</h1>} />
    <Route path="/about" component={() => <h1>About Page</h1>} />
    <Route path="/products" component={() => <h1>Products Page</h1>} />
    <Route
      path="/products/:product_id"
      component={() => <h1>Individual product</h1>}
    />
    <Route path="/contact" component={() => <h1>Contact page</h1>} />
    <Route path="/donations" component={() => <h1>Donations Page</h1>} />
  </Switch>
);
