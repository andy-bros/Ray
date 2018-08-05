import React from "react";
import Utils from "./utils";
import BreadCrumb from "./../BreadCrumb/BreadCrumb";
export default function Courses() {
  return (
    <div className="section-containers">
      <BreadCrumb />
      <h2 className="section-titles">MESSAGES</h2>
      <Utils type="Messages" />
    </div>
  );
}
