import React from "react";

export default function Menu({ handleNav, opened }) {
  return (
    <div className="menu-container" onClick={() => handleNav(!opened)}>
      <div
        className={
          opened === true
            ? "menu-slice top-opened"
            : "menu-slice menu-slice top-closed"
        }
      />
      <div className="menu-slice" />
      <div
        className={
          opened ? "menu-slice bottom-opened" : "menu-slice bottom-closed"
        }
      />
    </div>
  );
}
