import React from "react";
import axios from "axios";

class Product extends React.Component {
  state = {};
  componentDidMount() {
    axios
      .get("/api/getmp3pdf")
      .then(res => console.log("SUCCESS"))
      .catch(err => console.log(err));
  }
  render() {
    return <div>this is a test</div>;
  }
}
export default Product;
