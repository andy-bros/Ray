import React, { Component } from "react";
import { connect } from "react-redux";

class BreadCrumb extends Component {
  state = {
    name: "joe"
  };
  componentDidMount() {
    this.setState({ name: "jake" });
  }
  render() {
    console.log(this.props);
    return <div>BreadCrumb</div>;
  }
}
export default connect(state => state)(BreadCrumb);
