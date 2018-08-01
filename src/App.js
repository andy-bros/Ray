import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import routes from "./routes";
import { TopNavbar, SideNavbar } from "./components/Navbar/Navbars";
import { StripeProvider } from "react-stripe-elements";
import Footer from "./components/Navbar/Footer";
import store from "./redux/store";
import { Provider } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      navLinks: [
        // { nav: "HOME", to: "/" },
        { nav: "DONATE", to: "/donate" },
        { nav: "PRODUCTS", to: "/products" },
        { nav: "COURSES", to: "/courses" },
        // { nav: "CHECKOUT", to: "/checkout" },
        { nav: "MESSAGES", to: "/messages" }
      ]
    };
  }
  handleNav = val => {
    this.setState({ opened: val });
  };
  render() {
    let mappedLinks = this.state.navLinks.map((e, i) => {
      return (
        <Link key={e.to} to={e.to} onClick={() => this.handleNav(false)}>
          {e.nav}
        </Link>
      );
    });
    return (
      <Provider store={store}>
        <Router>
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
            <Fragment>
              <TopNavbar
                {...this.state}
                mappedLinks={mappedLinks}
                handleNav={this.handleNav}
              />
              <SideNavbar {...this.state} mappedLinks={mappedLinks} />
              <section id="routes" onClick={() => this.handleNav(false)}>
                {routes}
              </section>
              <Footer mappedLinks={mappedLinks} />
            </Fragment>
          </StripeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
