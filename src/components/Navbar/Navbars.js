import React, { Component } from "react";
import Menu from "./../animations/Menu";
import { DonateBtn } from "./../Donate/Customs";
import { Link } from "react-router-dom";
import logo from "../../assets/RMBlack.svg";
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
    let { handleNav, opened, mappedLinks, cart } = this.props;
    let mappedQuantity = cart.map(e => {
      if (e.quantity) {
        return e.quantity;
      } else return 1;
    });
    if (mappedQuantity.length) {
      mappedQuantity = mappedQuantity.reduce((p, c) => p + c);
    }
    return (
      <nav className="top">
        {/* <img
          className="logo"
          src={logo}
          width="50"
          height="50"
          background-color="#fff"
        /> */}
        {/* <div className="mapped-links">{mappedLinks}</div> */}

        <Menu key="menu" opened={opened} handleNav={handleNav} />
        <Link to="/">
          <img
            className="logo"
            src="https://cdn.dribbble.com/users/557720/screenshots/3167269/monogram_am.jpg"
            width="50"
            height="50"
          />
        </Link>
        <Link to="/checkout">
          <i
            className="fas fa-shopping-cart cart"
            onClick={() => handleNav()}
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
    <nav className={opened ? "side-navbar opened" : "side-navbar closed"}>
      {mappedLinks}
    </nav>
  );
}
