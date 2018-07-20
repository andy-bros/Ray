import React from "react";
import { Route, Switch } from "react-router-dom";
import Donate from "./components/Donate/Donate";
import Products from "./components/Product/Product";
import DonateForm from "./components/Donate/DonateForm";
import Checkout from "./components/Donate/Checkout";
import Messages from "./components/Messages/Messages";

export default (
  /*
    Here is the backbone for our routes.
   */
  <Switch>
    <Route exact path="/" component={() => <h1>Home Page</h1>} />
    <Route path="/about" component={() => <h1>About Page</h1>} />
    <Route path="/products" component={Products} />
    <Route
      path="/products/:product_id"
      component={() => <h1>Individual product</h1>}
    />
    <Route path="/contact" component={() => <h1>Contact page</h1>} />
    <Route path="/donations" component={() => <h1>Donations Page</h1>} />
    <Route path="/checkout" component={Donate} />
    <Route path="/donate" component={DonateForm} />
    <Route path="/messages" component={Messages} />
  </Switch>
);
