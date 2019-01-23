const mongoose = require("mongoose");
const ItemCategory = mongoose.model("itemCategories");

const uri = "/api/item_categories";

module.exports = app => {
  app.post(uri, async (req, res) => {
    const { name } = req.body.category;
    const createdItemCategory = await new ItemCategory({ name }).save();
    res.json({
      status: "success",
      message: "New category created.",
      data: {
        category: createdItemCategory
      }
    });
  });

  app.get(uri, async (req, res) => {
    const categories = await ItemCategory.find({});
    res.json({
      status: "success",
      message: "Categories found.",
      data: {
        categories
      }
    });
  });
};
