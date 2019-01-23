const mongoose = require("mongoose");
const { Schema } = mongoose;
// item: { type: Schema.Types.ObjectId, ref: "items" },

const buyVoucherSchema = new Schema({
  buyItems: [{ type: Schema.Types.ObjectId, ref: "buyItems" }],
  totalPrice: Number,
  cratedMonth: String,
  createYear: Number,
  createdAt: { type: Date, default: Date.now() }
});

mongoose.model("buyVouchers", buyVoucherSchema);
