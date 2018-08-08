import React from "react";
import Utils from "./utils";

export default function Courses(props) {
  // console.log("PROPS", props.history.goBack);
  return (
    <div className="section-containers">
      <h2 className="section-titles">SERMON SERIES</h2>
      <Utils crumbs={["SERMON SERIES"]} type="Courses" />
    </div>
  );
}
