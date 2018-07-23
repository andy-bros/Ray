import React, { Component } from "react";
import Menu from "./../animations/Menu";
import { DonateBtn } from "./../Donate/Customs";

export function TopNavbar({ handleNav, opened, mappedLinks }) {
  return (
    <nav className="top">
      <div className="mapped-links">{mappedLinks}</div>
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
