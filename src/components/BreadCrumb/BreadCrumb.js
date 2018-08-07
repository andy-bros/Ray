import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BreadCrumb extends Component {
  render() {
    console.log(this.props);
    console.log("CRUMBS", this.props.crumbs);
    let newCrumbs = this.props.crumbs.map((e, i, a) => {
      if (i === a.length - 1) {
        return <h5>{e}</h5>;
      } else if (i === 0) {
        return (
          <Link to={`/${e.toLowerCase()}`} key={e}>
            <h5>{e}</h5>
          </Link>
        );
      } else {
        return (
          <Link to={`/${e.path}`} key={e}>
            <h5>{e.title}</h5>
          </Link>
        );
      }
    });
    return (
      <div className="breadcrumb-nav">
        <Link to="/">
          <h5>HOME</h5>
        </Link>
        {newCrumbs}
      </div>
    );
  }
}
export default connect(state => state)(BreadCrumb);
