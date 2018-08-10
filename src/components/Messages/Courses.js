import React from "react";
import Utils from "./utils";

export default function Courses(props) {
  return (
    <div className="section-containers">
      <h2 className="section-titles">COURSES</h2>
      <Utils crumbs={["COURSES"]} type="Courses" />
    </div>
  );
}
