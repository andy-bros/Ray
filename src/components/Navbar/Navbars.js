import React, { Component } from "react";
import Menu from "./../animations/Menu";
import { DonateBtn } from "./../Donate/Customs";
import { Link } from "react-router-dom";

export class TopNavbar extends Component {
  constructor() {
    super();
    this.state = {
      cartLength: 0
    };
  }
  updateCart() {
    this.setState({ cartLength: this.cartLength + 1 });
  }
  render() {
    let { handleNav, opened, mappedLinks } = this.props;
    return (
      <nav className="top">
        <div className="mapped-links">{mappedLinks.slice(0, 2)}</div>
        <img
          src="https://cdn.dribbble.com/users/557720/screenshots/3167269/monogram_am.jpg"
          width="50"
          height="50"
        />
        <div className="mapped-links">{mappedLinks.slice(2, 4)}</div>
        <Menu key="menu" opened={opened} handleNav={handleNav} />
        <Link to="/checkout">
          <i
            className="fas fa-shopping-cart cart"
            onClick={() => handleNav()}
          />
        </Link>
        {this.state.length && (
          <span className="cart-notification">{this.state.cartLength}</span>
        )}
      </nav>
    );
  }
}
export function SideNavbar({ opened, mappedLinks }) {
  return (
    <nav className={opened ? "side-navbar opened" : "side-navbar closed"}>
      {mappedLinks}
    </nav>
  );
}
