import React from "react";
import { Route, Switch } from "react-router-dom";
import Donate from "./components/Donate/Donate";

export default (
  <Switch>
    <Route path="/checkout" component={Donate} />
  </Switch>
);
