import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import api from "../utitlites/api";

const RenderCategories = ({ categories }) => {
  console.log("​categories", categories);
  if (!categories || categories.length === 0) return <div>Loading...</div>;
  return categories.map((category, index) => (
    <Grid item xs={3} key={index}>
      <Card>
        <CardContent>{category.name}</CardContent>
      </Card>
    </Grid>
  ));
};

class Categories extends Component {
  state = {
    categoryName: "",
    categoryNameFieldError: false,
    snackBarMessage: "",
    isSnackBarOpen: false,
    categories: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ isSnackBarOpen: false });
  };

  createNewCategory = async event => {
    event.preventDefault();
    if (!this.state.categoryName) {
      return this.setState({ categoryNameFieldError: true });
    }
    const { data } = await api.postItemCategories({
      category: { name: this.state.categoryName }
    });
    const { message, expectedData } = data;
    this.setState({
      isSnackBarOpen: true,
      snackBarMessage: message,
      categories: expectedData.categories
    });
  };

  async componentDidMount() {
    const { data } = await api.getItemCategories();
    this.setState({ categories: data.expectedData.categories });
  }

  render() {
    return (
      <div>
        <form noValidate onSubmit={this.createNewCategory}>
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Button
                onClick={this.createNewCategory}
                variant="contained"
                style={{ backgroundColor: "#8bc34a" }}
                disabled={!this.state.categoryName}
              >
                Add Category
              </Button>
            </Grid>
            <Grid item xs={1} />
            <Grid item>
              <TextField
                id="category_name"
                label="Category Name"
                variant="outlined"
                value={this.state.categoryName}
                onChange={this.handleChange("categoryName")}
              />
            </Grid>
          </Grid>
        </form>
        <Grid container>
          <Grid item xs={12} style={{ paddingTop: 30, paddingBottom: 30 }}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <RenderCategories categories={this.state.categories} />
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.isSnackBarOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={<span>{this.state.snackBarMessage}</span>}
        />
      </div>
    );
  }
}

export default Categories;
