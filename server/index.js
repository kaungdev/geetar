const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://127.0.0.1:27017/geetar",
  { useNewUrlParser: true }
);

require("./models/BuyItem");
require("./models/BuyVoucher");
require("./models/Item");
require("./models/ItemCategory");
require("./models/SellItem");
require("./models/SellVoucher");

app.use(morgan("dev"));
app.use(bodyParser.json());

require("./routes/item_categories")(app);
require("./routes/items")(app);

app.get("/health_check", (req, res) => {
  res.json({ status: "success", message: "im fine" });
});

app.listen(PORT);
