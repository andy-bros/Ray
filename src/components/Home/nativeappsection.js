import React from "react";

function SectionDetails({title,paragraph}) {
  return (
    <div className="ea-mobile-app-detail">
      <h2>{title}</h2>
      <h6>{paragraph}</h6>
    </div>
  );
}
export default SectionDetails;
