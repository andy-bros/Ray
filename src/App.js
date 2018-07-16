import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import "./Sass/input.scss";
import { StripeProvider } from "react-stripe-elements";

class App extends Component {
  render() {
    return (
      <Router>
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
          <div>
            <header>Ray McCollum</header>
            {routes}
          </div>
        </StripeProvider>
      </Router>
    );
  }
}

export default App;
