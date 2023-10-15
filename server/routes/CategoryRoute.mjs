import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
} from "../controllers/CategoryController.mjs";

const route = Router();

route.post("/create-category", createCategory);
route.put("/update-category/:id", updateCategory);
route.get("/get-category", getCategory);
route.get("/single-category/:slug", getSingleCategory);
route.delete("/delete-category/:id", deleteCategory);

export default route;
