import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import AppBar from "../components/App/AppBar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <div>hello from app js</div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  null
)(App);
