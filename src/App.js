import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import "./Sass/input.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>Ray McCollum</header>
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;
