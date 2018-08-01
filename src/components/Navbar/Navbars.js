import React, { Component } from 'react';
import Menu from './../animations/Menu';
import { DonateBtn } from './../Donate/Customs';
import { Link } from 'react-router-dom';
import logo from '../../assets/RMBlack.svg';

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
        <img
          className="logo"
          src="https://cdn.dribbble.com/users/557720/screenshots/3167269/monogram_am.jpg"
          width="50"
          height="50"
        />
        {/* <img
          className="logo"
          src={logo}
          width="50"
          height="50"
          background-color="#fff"
        /> */}
        <div className="mapped-links">{mappedLinks}</div>

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
    <nav className={opened ? 'side-navbar opened' : 'side-navbar closed'}>
      {mappedLinks}
    </nav>
  );
}
