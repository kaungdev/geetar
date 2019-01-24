import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import Categories from "./Categories";

import AppBar from "../components/App/AppBar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Route exact path="/categories" component={Categories} />
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  null
)(App);
