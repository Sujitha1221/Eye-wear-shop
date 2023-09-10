import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import AllProducts from "./AllProducts";

const ProductLayout = () => {
  return (
    <>
      <Outlet />
      <Routes>
        <Route>
          <Route path="/all-products" element={<AllProducts />}></Route>
          <Route path="/view-product/:slug" element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default ProductLayout;
