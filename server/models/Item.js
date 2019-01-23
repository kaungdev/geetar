const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "items" },
  itemCategory: { type: Schema.Types.ObjectId, ref: "itemCategories" },
  itemPrice: Number,
  stockQuantity: Number,
  createdAt: { type: Date, default: Date.now() }
});

mongoose.model("items", itemSchema);
