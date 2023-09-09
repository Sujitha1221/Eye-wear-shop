const route = require("express").Router();
const formidable = require("express-formidable");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  getPhoto,
  deleteproduct,
  updateProduct,
  filterProducts,
} = require("../controllers/ProductController");

route.post("/create-product", formidable(), createProduct);
route.get("/get-products", getProducts);
route.get("/get-product/:slug", getSingleProduct);
route.get("/get-product-photo/:pid", getPhoto);
route.delete("/delete-product/:pid", deleteproduct);
route.put("/update-product/:pid", formidable(), updateProduct);
route.get("/product-filters", filterProducts);

module.exports = route;
