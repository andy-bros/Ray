import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import { TopNavbar, SideNavbar, NavbarRP } from "./components/Navbar/Navbars";
import { StripeProvider } from "react-stripe-elements";

class App extends Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      navLinks: [
        { nav: "PRODUCTS", to: "/products" },
        { nav: "CONTACT", to: "/contact" },
        { nav: "ABOUT", to: "/about" },
        { nav: "DONATE", to: "/donate" }
      ]
    };
  }
  handleNav = val => {
    this.setState({ opened: val });
  };
  render() {
    let { opened, navLinks } = this.state;
    return (
      <Router>
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
          <Fragment>
            <TopNavbar
              opened={opened}
              handleNav={this.handleNav}
              navLinks={navLinks}
            />
            <SideNavbar
              opened={opened}
              handleNav={this.handleNav}
              navLinks={navLinks}
            />
            <section id="routes" onClick={() => this.handleNav(false)}>
              {routes}
            </section>
          </Fragment>
        </StripeProvider>
      </Router>
    );
  }
}

export default App;
