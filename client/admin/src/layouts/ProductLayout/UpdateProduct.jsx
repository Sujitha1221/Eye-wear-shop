import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setProductName(data.product.productName);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setInStock(data.product.inStock);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("productName", productName);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("inStock", inStock);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        alert("Product updated Successfully");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col align-items w-full min-h-[85vh]">
        <div className="px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          Update Product
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center grid grid-cols-2 gap-4 p-10">
            <div className="col-span-2 p-4">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full p-2 border rounded"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.categoryName}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-span-2 p-4">
              <label className="w-full p-2 border rounded cursor-pointer">
                {photo ? photo.name : "Upload product image"}
                <input
                  type="file"
                  id="uploadImages"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="col-span-2 p-4">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img-img-responsive"
                  ></img>
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:8080/product/get-product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    width={"250px"}
                    className="img-img-responsive"
                  ></img>
                </div>
              )}
            </div>
            <div className="col-span-2 p-4">
              <TextField
                label="Product Name"
                variant="outlined"
                style={{ width: "100%" }}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="col-span-2 p-4">
              <TextField
                label="Product Description"
                variant="outlined"
                style={{ width: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="p-4 flex justify-center">
              <TextField
                label="Price"
                type="Number"
                variant="outlined"
                style={{ width: "100%" }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div class="p-4 flex justify-center">
              <TextField
                label="Product Quantity"
                type="Number"
                variant="outlined"
                style={{ width: "100%" }}
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
              />
            </div>
            <div className="col-span-2 flex justify-center pt-5">
              <button
                type="submit"
                className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
