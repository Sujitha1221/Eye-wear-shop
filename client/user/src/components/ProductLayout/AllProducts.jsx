import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Link, TextField } from "@mui/material";
import { Prices } from "../Prices";

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [noofItems, setNoOfItems] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    getTotal();
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
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

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

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch search function from backend
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/product/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getAllProducts();
    }
  };

  function redirect() {
    window.location.replace("/payment");
  }

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
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mt-7">
              Filter by price
            </h2>
            <div className="mt-4">
              {" "}
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((r) => (
                  <div key={r._id}>
                    <Radio value={r.array}>{r.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="w-full justify-end">
            <button onClick={redirect}> Make Payment </button>
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                All Products
              </h2>
              <input
                type="search"
                id="default-search"
                onChange={searchHandle}
                className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5"
                placeholder="Search Product"
                required
              ></input>
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
                          onClick={() =>
                            navigate(`/product/view-product/${p.slug}`)
                          }
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
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
