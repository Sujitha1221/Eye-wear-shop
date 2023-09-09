import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from "../components/ProductLayout/AllProducts";
import ProductDetails from "../components/ProductLayout/ProductDetails";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AllProducts />}>
            <Route path="/product" />
          </Route>
          <Route element={<ProductDetails />}>
            <Route path="/product/:slug" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
