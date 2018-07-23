import React from "react";

export default function Menu({ handleNav, opened }) {
  return (
    <button className="menu-container" onClick={() => handleNav(!opened)}>
      <div
        className={opened ? "menu-slice top-opened" : "menu-slice top-closed"}
      />
      <div className="menu-slice" />
      <div
        className={
          opened ? "menu-slice bottom-opened" : "menu-slice bottom-closed"
        }
      />
    </button>
  );
}
