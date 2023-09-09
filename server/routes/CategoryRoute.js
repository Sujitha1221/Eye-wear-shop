const route = require("express").Router();
const {
  createCategory,
  updateCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

route.post("/create-category", createCategory);
route.put("/update-category/:id", updateCategory);
route.get("/get-category", getCategory);
route.get("/single-category/:slug", getSingleCategory);
route.delete("/delete-category/:id", deleteCategory);

module.exports = route;
