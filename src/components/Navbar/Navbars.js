import React, { Component } from "react";
import Menu from "./../animations/Menu";
import { DonateBtn } from "./../Donate/Customs";
import { Link } from "react-router-dom";
import logo from "./RMGrey.jpg";
import { getCart } from "./../../redux/cartReducer";
import { connect } from "react-redux";

class TopNavTake2 extends Component {
  constructor() {
    super();
    this.state = {
      cartLength: 0
    };
  }
  updateCart() {
    this.setState({ cartLength: this.cartLength + 1 });
  }
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    let { handleNav, opened, cart, navLinks } = this.props;
    let mappedQuantity = cart.map(e => {
      if (e.quantity) {
        return e.quantity;
      } else return 1;
    });
    if (mappedQuantity.length) {
      mappedQuantity = mappedQuantity.reduce((p, c) => p + c);
    }
    const navigationTop = navLinks.map((e, i) => {
      return (
        <Link
          className="navlinks-spread"
          key={e.to}
          to={e.to}
          onClick={() => handleNav(false)}
        >
          <div className="nav-item-spread">{e.nav}</div>
        </Link>
      );
    });
    return (
      <nav className="top">
        <Menu key="menu" opened={opened} handleNav={handleNav} />
        {navigationTop.slice(0, 2)}
        <Link to="/">
          <h1 className="logo-font">PR</h1>
          {/* <img src={logo} width="75px" onClick={() => handleNav(false)} /> */}
        </Link>
        {navigationTop.slice(2)}
        <Link to="/checkout">
          <i
            className="fas fa-shopping-cart cart"
            onClick={() => handleNav(false)}
          />
          {cart.length ? (
            <span className="cart-notification">{mappedQuantity}</span>
          ) : null}
        </Link>
      </nav>
    );
  }
}
export const TopNavbar = connect(
  state => state.cartReducer,
  { getCart }
)(TopNavTake2);

export function SideNavbar({ opened, mappedLinks }) {
  return (
    <nav
      className={
        opened === true
          ? "side-navbar opened"
          : opened === false
            ? "side-navbar closed"
            : "side-navbar hidden"
      }
    >
      {mappedLinks}
    </nav>
  );
}
