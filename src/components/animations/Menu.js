import React from "react";

export default function Menu({ handleNav, opened }) {
  return (
    <button className="menu-container" onClick={() => handleNav(!opened)}>
      <div className="menu-slice" />
      <div className="menu-slice" />
      <div className="menu-slice" />
    </button>
  );
}
