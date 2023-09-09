import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Modal } from "antd";
import { TextField, Radio } from "@mui/material";

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pricesData, setPricesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [noofItems, setNoOfItems] = useState("");
  const [radio, setRadio] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/product/get-products"
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
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

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const addToCart = (product, selectedQuantity) => {
    const existingCartItem = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = existingCartItem.findIndex(
      (item) => item._id === product._id
    );

    if (cartItemIndex !== -1) {
      existingCartItem[cartItemIndex].selectedQuantity = selectedQuantity;
    } else {
      existingCartItem.push({ ...product, selectedQuantity });
    }
    localStorage.setItem("cart", JSON.stringify(existingCartItem));
    alert("Item added to cart successfully");
  };

  return (
    <>
      <div className="bg-white w-full">
        <div className="flex">
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Filter by category
            </h2>
            <div className="mt-4">
              {" "}
              {categories?.map((c) => (
                <div key={c._id} className="flex items-center">
                  <Checkbox
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  />
                  <span className="ml-2">{c.categoryName}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full justify-end">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
              {JSON.stringify(checked, null, 4)}
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                All Products
              </h2>
            </div>
            <div className="mt-9 w-100 flex flex-wrap">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4"
                >
                  <div className="group relative">
                    <div
                      className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                      style={{
                        backgroundImage: `url(http://localhost:8080/product/get-product-photo/${p._id})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="mt-4 flex flex-col justify-between items-center">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          {p.productName}
                        </h3>
                        <p className="text-sm font-medium text-gray-900">
                          Rs. {p.price}.00
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          In Stock: {p.inStock}
                        </p>
                      </div>

                      <TextField
                        id="outlined-basic"
                        type="Number"
                        label="No of items you need"
                        variant="outlined"
                        onChange={(e) => setNoOfItems(e.target.value)}
                        sx={{ marginTop: "10px" }}
                        required
                      />

                      <div className="mt-4 flex space-x-4">
                        <button
                          type="submit"
                          className="bg-transparent text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="bg-transparent text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          onClick={() => addToCart(p, noofItems)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
