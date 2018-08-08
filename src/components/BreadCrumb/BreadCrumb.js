import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BreadCrumb extends Component {
  render() {
    console.log(this.props);
    console.log("CRUMBS", this.props.crumbs);
    let newCrumbs = this.props.crumbs.map((e, i, a) => {
      if (i === a.length - 1) {
        return <pre className="current-crumb prev-tab-no-home"> {e} </pre>;
      } else if (i === 0) {
        return (
          <Link to={`/${e.toLowerCase()}`} key={e}>
            <pre className="previous-crumb-tab prev-tab-no-home"> {e} > </pre>
          </Link>
        );
      } else {
        return (
          <Link to={`/${e.path}`} key={e}>
            <pre className="previous-crumb-tab prev-tab-no-home">
              {" "}
              {e.title} >{" "}
            </pre>
          </Link>
        );
      }
    });
    return (
      <div className="breadcrumb-nav">
        <Link to="/">
          <pre className="previous-crumb-tab">HOME > </pre>
        </Link>
        {newCrumbs}
      </div>
    );
  }
}
export default connect(state => state)(BreadCrumb);
