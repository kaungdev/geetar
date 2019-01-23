const mongoose = require("mongoose");
const { Schema } = mongoose;

const buyItemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "items" },
  buyVoucher: { type: Schema.Types.ObjectId, ref: "buyVouchers" },
  itemPrice: Number,
  quantity: Number,
  createdAt: { type: Date, default: Date.now() }
});

buyItemSchema.virtual("totalPrice").get(function() {
  return this.itemPrice * this.quantity;
});

mongoose.model("buyItems", buyItemSchema);
