import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function EmptyCartInfo() {
  return (
    <div className="empty-cart">
      <div>
        <h2>There is nothing to see here yet</h2>
        <Link to="/products">
          <h2>Shop now</h2>
        </Link>
      </div>
    </div>
  );
}
