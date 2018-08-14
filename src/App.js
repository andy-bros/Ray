import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import routes from "./routes";
import { TopNavbar, SideNavbar } from "./components/Navbar/Navbars";
import { StripeProvider } from "react-stripe-elements";
import Footer from "./components/Navbar/Footer";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ScrollContext } from "react-router-scroll-4";

class App extends Component {
  constructor() {
    super();
    this.state = {
      opened: 0,
      navLinks: [
        { nav: "PRODUCTS", to: "/products" },
        { nav: "COURSES", to: "/courses" },
        { nav: "MESSAGES", to: "/messages" },
        { nav: "DONATE", to: "/donate" }
      ]
    };
  }
  handleNav = val => {
    if (this.state.opened != val) {
      this.setState({ opened: val });
    }
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
    return (
      <Provider store={store}>
        <Router>
          <ScrollContext>
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
              <Fragment>
                <TopNavbar {...this.state} handleNav={this.handleNav} />
                <SideNavbar {...this.state} mappedLinks={mappedLinks} />
                <section id="routes">
                  {routes}
                  <Link to="donate">
                    {/* <i className="fas fa-donate donate-link" /> */}
                    <div className="donate-button-link">
                      <p>Donate</p>
                    </div>
                  </Link>
                </section>
                <Footer />
              </Fragment>
            </StripeProvider>
          </ScrollContext>
        </Router>
      </Provider>
    );
  }
}

export default App;
