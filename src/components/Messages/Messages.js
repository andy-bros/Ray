import React from "react";
import Utils from "./utils";
import BreadCrumb from "./../BreadCrumb/BreadCrumb";
export default function Courses(props) {
  return (
    <div className="section-containers">
      <h2 className="section-titles">MESSAGES</h2>
      <Utils crumbs={["MESSAGES"]} type="Messages" />
    </div>
  );
}
