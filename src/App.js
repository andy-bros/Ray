import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar/Navbar";
// import { StripeProvider } from "react-stripe-elements";

class App extends Component {
  render() {
    return (
      <Router>
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Fragment>
          <Navbar />
          {routes}
        </Fragment>
         </StripeProvider>
      </Router>
    );
  }
}

export default App;
