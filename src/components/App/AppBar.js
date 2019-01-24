import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const MyAppBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ color: "white" }} variant="h6">
            <Link to="/">GeeTar</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: 24 }} />
    </div>
  );
};

export default MyAppBar;
