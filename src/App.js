import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        {routes}
      </StripeProvider>
    );
  }
}

export default App;
