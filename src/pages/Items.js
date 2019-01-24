import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../utitlites/api";

export class BuyVouchers extends Component {
  state = {
    newItemName: "",
    newItemCategoryId: "",
    newItemSellPrice: 0,

    isSnackBarOpen: false,
    categories: [],
    items: [],

    snackBarMessage: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async componentDidMount() {
    const { data } = await api.getItemCategories();
    this.setState({ categories: data.expectedData.categories });
  }

  createNewItem = async event => {
    // name, itemCategory, itemSellPrice
    event.preventDefault();
    const name = this.state.newItemName;
    const itemCategory = this.state.newItemCategoryId;
    const itemSellPrice = this.state.newItemSellPrice;

    if (!name || !itemCategory || !itemSellPrice) return;

    const payload = { item: { name, itemCategory, itemSellPrice } };
    const { data } = await api.postItems(payload);
    const { expectedData } = data;
    console.log("​BuyVouchers -> expectedData", expectedData);
  };

  render() {
    return (
      <div>
        <form noValidate onSubmit={this.createNewItem}>
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                style={{ backgroundColor: "#8bc34a" }}
                onClick={this.createNewItem}
              >
                Add New Item
              </Button>
            </Grid>

            <Grid item xs={1} />

            <Grid item>
              <TextField
                id="newItemSellPrice"
                label="Item Sell Price"
                variant="outlined"
                value={this.state.newItemSellPrice}
                onChange={this.handleChange("newItemSellPrice")}
              />
            </Grid>

            <Grid item xs={1} />

            <Grid item>
              <TextField
                value={this.state.newItemCategoryId}
                id="categorySelector"
                select
                variant="outlined"
                onChange={this.handleChange("newItemCategoryId")}
                style={{ width: 200 }}
              >
                {this.state.categories.map(category => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={1} />

            <Grid item>
              <TextField
                id="newItemName"
                label="Item Name"
                variant="outlined"
                value={this.state.newItemName}
                onChange={this.handleChange("newItemName")}
              />
            </Grid>
          </Grid>
        </form>
        <Grid container>
          <Grid item xs={12} style={{ paddingTop: 30, paddingBottom: 30 }}>
            <LinearProgress />
            <Divider />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default BuyVouchers;
