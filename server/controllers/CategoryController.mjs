import Category from "../models/Category.mjs";
import slugify from "slugify";
import Product from "../models/Product.mjs";

//create new category
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new Category({
      categoryName,
      slug: slugify(categoryName),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update a particular category
export const updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { categoryName, slug: slugify(categoryName) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//retrieve all categories
export const getCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

//retrieve a particular category
export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Retrieved single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

//delete a particular category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if there are any products associated with the category
    const productsInCategory = await Product.find({ category: id });

    if (productsInCategory.length > 0) {
      return res.status(400).send({
        success: false,
        message:
          "Category cannot be deleted because it has associated products",
      });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};
