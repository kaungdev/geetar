import axios from "axios";
const domain = "http://localhost:5000";
const item_categories_url = domain + "/api/item_categories";
const items_url = domain + "/api/items";

export default {
  postItemCategories: payload => axios.post(item_categories_url, payload),
  getItemCategories: () => axios.get(item_categories_url),
  postItems: payload => axios.post(items_url, payload),
  getItems: () => axios.get(items_url)
};
