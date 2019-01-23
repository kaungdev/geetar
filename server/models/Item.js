const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "items" },
  itemCategory: { type: Schema.Types.ObjectId, ref: "itemCategories" },
  itemPrice: { type: Number, default: 0 },
  stockQuantity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

mongoose.model("items", itemSchema);
