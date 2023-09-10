import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductLayout from "../components/ProductLayout";
import Payment from "../components/PaymentLayout/Payment";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/product/*" element={<ProductLayout />}>
            <Route path="all-products" />
            <Route path="view-product/:slug" />
          </Route>
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
