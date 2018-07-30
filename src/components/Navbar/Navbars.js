import React, { Component } from "react";
import Menu from "./../animations/Menu";
import { DonateBtn } from "./../Donate/Customs";

export function TopNavbar({ handleNav, opened, mappedLinks }) {
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
    </nav>
  );
}
export function SideNavbar({ opened, mappedLinks }) {
  return (
    <nav className={opened ? "side-navbar opened" : "side-navbar closed"}>
      {mappedLinks}
    </nav>
  );
}
