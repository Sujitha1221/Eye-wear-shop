import React from "react";
import { Route, Routes } from "react-router-dom";
import AllProducts from "./AllProducts";

const index = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="view-products" element={<AllProducts />} />
        </Route>
      </Routes>
    </>
  );
};

export default index;
