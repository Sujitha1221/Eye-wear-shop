import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductLayout from "../components/ProductLayout";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/product/*" element={<ProductLayout />}>
            <Route path="all-products" />
            <Route path="view-product/:slug" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
