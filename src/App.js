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
      opened: null,
      navLinks: [
        // { nav: "HOME", to: "/" },
        { nav: "PRODUCTS", to: "/products" },
        { nav: "COURSES", to: "/courses" },
        // { nav: "CHECKOUT", to: "/checkout" },
        { nav: "MESSAGES", to: "/messages" },
        { nav: "DONATE", to: "/donate" }
      ]
    };
  }
  handleNav = val => {
    this.setState({ opened: val });
  };
  render() {
    let mappedLinks = this.state.navLinks.map((e, i) => {
      return (
        <Link
          className="link-tag"
          key={e.to}
          to={e.to}
          onClick={() => this.handleNav(false)}
        >
          <div className="nav-item">{e.nav}</div>
        </Link>
      );
    });
    console.log(this.state.opened);
    return (
      <Provider store={store}>
        <Router>
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
            <Fragment>
              <TopNavbar {...this.state} handleNav={this.handleNav} />
              <SideNavbar {...this.state} mappedLinks={mappedLinks} />
              <section id="routes" onLoad={() => window.scroll(0, 0)}>
                {routes}
              </section>
              <Footer />
            </Fragment>
          </StripeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
