import express from "express";
import formidable from "express-formidable";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  getPhoto,
  deleteproduct,
  updateProduct,
  filterProducts,
  productCount,
  productList,
  searchproduct,
} from "../controllers/ProductController.mjs"; // Import your controllers as ES6 modules

const route = express.Router();

route.post("/create-product", formidable(), createProduct);
route.get("/get-products", getProducts);
route.get("/get-product/:slug", getSingleProduct);
route.get("/get-product-photo/:pid", getPhoto);
route.delete("/delete-product/:pid", deleteproduct);
route.put("/update-product/:pid", formidable(), updateProduct);
route.post("/product-filters", filterProducts);
route.get("/product-count", productCount);
route.get("/product-list/:page", productList);
route.get("/search/:keyword", searchproduct);

export default route;
