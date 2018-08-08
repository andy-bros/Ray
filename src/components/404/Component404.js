import React from "react";
import { Link } from "react-router-dom";

export default function Component404({ pathRedirect, title, button }) {
  return (
    <div className="component404">
      <div className="center-container">
        <h2 className="section-titles">{title}</h2>
        <Link to={pathRedirect}>
          <button className="btn-primary">BACK TO {button}</button>
        </Link>
      </div>
    </div>
  );
}
