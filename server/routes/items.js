const mongoose = require("mongoose");
const Item = mongoose.model("items");
const ItemCategory = mongoose.model("itemCategories");
const uri = "/api/items";

module.exports = app => {
  app.post(uri, async (req, res) => {
    const { name, itemCategory, itemSellPrice } = req.body.item;

    const foundItemCategory = await ItemCategory.findById(itemCategory);

    if (!foundItemCategory) {
      return res.json({ status: "fail", message: "Category not found" });
    }

    const createdItem = await new Item({
      name,
      itemCategory: foundItemCategory,
      itemSellPrice
    }).save();

    foundItemCategory.items.push(createdItem);
    foundItemCategory.save();

    res.json({
      status: "success",
      message: "New item created successfully",
      data: {
        item: createdItem
      }
    });
  });

  app.get(uri, async (req, res) => {
    const items = await Item.find({}).populate("itemCategory");

    res.json({
      status: "success",
      message: "New item created successfully",
      data: {
        items
      }
    });
  });
};
