import React, { Component } from "react";
import Menu from "./../animations/Menu";
import { DonateBtn } from "./../Donate/Customs";
import { Link } from "react-router-dom";

// export function NavbarRP(props) {
//   let mappedLinks = navLinks.map((e, i) => {
//     return (
//       <Link key={e.to} to={e.to} onClick={() => handleNav(false)}>
//         {e.nav}
//       </Link>
//     );
//   });
//   return props.render();
// }
export function TopNavbar({ handleNav, opened, navLinks }) {
  console.log(navLinks);
  let mappedLinks = navLinks.map((e, i) => {
    return (
      <Link key={e.to} to={e.to}>
        {e.nav}
      </Link>
    );
  });
  return (
    <nav className="top">
      <div className="mapped-links">{mappedLinks}</div>
      <Menu key="menu" opened={opened} handleNav={handleNav} />
    </nav>
  );
}
export function SideNavbar({ navLinks, handleNav, opened }) {
  let mappedLinks = navLinks.map((e, i) => {
    return (
      <Link key={e.to} to={e.to} onClick={() => handleNav(false)}>
        {e.nav}
      </Link>
    );
  });
  return (
    <nav className={opened ? "side-navbar opened" : "side-navbar closed"}>
      {mappedLinks}
    </nav>
  );
}
