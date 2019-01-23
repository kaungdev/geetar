const mongoose = require("mongoose");
const moment = require("moment");
const Item = mongoose.model("items");
const ItemCategory = mongoose.model("itemCategories");
const BuyItem = mongoose.model("buyItems");
const BuyVoucher = mongoose.model("buyVouchers");
const uri = "/api/buy_items";

module.exports = app => {
  app.get(uri, async (req, res) => {
    const buyItems = await BuyItem.find({});
    res.json({
      status: "success",
      message: "Buy items found.",
      buyItems
    });
  });

  app.post(uri, async (req, res) => {
    const newBuyVoucher = new BuyVoucher({});
    const newBuyItems = [];
    let voucherTotalPrice = 0;

    const { buyItems } = req.body;
    for (const buyItem of buyItems) {
      const { _id, quantity, itemBuyPrice } = buyItem;

      const foundItem = await Item.findById(_id);

      if (!foundItem) {
        return res.json({
          status: "fail",
          message: "Item not found."
        });
      }

      const newBuyItem = new BuyItem({
        item: foundItem,
        buyVoucher,
        itemBuyPrice,
        quantity,
        itemBuyTotalPrice: quantity * itemBuyPrice
      });

      voucherTotalPrice += quantity * itemBuyPrice;
      newBuyItems.push(newBuyItem);
    }

    newBuyVoucher.totalPrice = voucherTotalPrice;

    try {
      for (const buyItem of newBuyItems) {
        await buyItem.save();
      }
      newBuyVoucher.save();
    } catch (error) {
      res.json({
        status: "fail",
        message: "Failed to create new item",
        error
      });
    }
  });
};
