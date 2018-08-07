import React from "react";
import Utils from "./utils";

export default function Courses(props) {
  // console.log("PROPS", props.history.goBack);
  return (
    <div className="section-containers">
      <button onClick={() => props.history.goBack()}>go back here</button>
      <h2 className="section-titles">COURSES</h2>
      <Utils type="Courses" />
    </div>
  );
}
