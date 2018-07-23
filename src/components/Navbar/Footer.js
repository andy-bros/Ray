import React from "react";

export default function Footer({ mappedLinks }) {
  console.log(mappedLinks);
  return (
    <footer>
      <div>{mappedLinks}</div>
      <div />
    </footer>
  );
}
