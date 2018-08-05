import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function EmptyCartInfo() {
  return (
    <div className="empty-cart">
      <div className="center-container">
        <h2 className="section-titles">Your cart is empty.</h2>
        <Link to="/products">
          <button className="btn-condition lead">Shop now</button>
        </Link>
      </div>
    </div>
  );
}
