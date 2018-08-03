import React from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./components/Products/Products";
import Product from "./components/Products/Product";
import DonateForm from "./components/Donate/DonateForm";
import Checkout from "./components/Checkout/Checkout";
import Messages from "./components/Messages/Messages";
import Home from "./components/Home/Home";
import Courses from "./components/Messages/Courses";
import SpecificMessages from "./components/Messages/SpecificMessages";
import EachIndividualMessage from "./components/Messages/IndividualMess";

export default (
  /*
    Here is the backbone for our routes.
   */
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/products" component={Products} />
    <Route path="/products/:product" component={Product} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/donate" component={DonateForm} />
    <Route
      exact
      path="/messages/:messages/:id"
      component={EachIndividualMessage}
    />
    <Route path="/courses/:courses/:id" component={EachIndividualMessage} />
    <Route path="/messages/:messages/" component={SpecificMessages} />

    <Route path="/courses/:courses" component={SpecificMessages} />
    <Route path="/messages" component={Messages} />
    <Route path="/courses" component={Courses} />
  </Switch>
);
