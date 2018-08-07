import React from "react";
import Utils from "./utils";
import BreadCrumb from "./../BreadCrumb/BreadCrumb";
export default function Courses(props) {
  return (
    <div className="section-containers">
      <button onClick={() => props.history.goBack()}>go back here</button>
      <h2 className="section-titles">MESSAGES</h2>
      <Utils type="Messages" />
    </div>
  );
}
