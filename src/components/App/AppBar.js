import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const MyAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ color: "white" }} variant="h6">
          GeeTar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
