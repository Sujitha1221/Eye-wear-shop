import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";
import DeliveryDriverLayout from "../layouts/DeliveryDriverLayout";
import DeliveryDriverViewLayout from "../layouts/DeliveryDriverViewLayout";
import CategoryLayout from "../layouts/CategoryLayout";
import ProductLayout from "../layouts/ProductLayout";
import "antd/dist/reset.css";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" />
          </Route>
          <Route path="delivery" element={<DeliveryLayout />}>
            <Route path="view-delivery" />
            <Route path="update-delivery/:id" />
          </Route>
          <Route path="delivery-driver" element={<DeliveryDriverLayout />}>
            <Route path="view-delivery-driver" />
            <Route path="add-delivery-driver" />
            <Route path="view-delivery-driver-details/:id" />
            <Route path="update-delivery-driver/:id" />
          </Route>
          <Route
            path="delivery-driver-view"
            element={<DeliveryDriverViewLayout />}
          >
            <Route path="view-delivery-driver" />
          </Route>
          <Route path="category" element={<CategoryLayout />}>
            <Route path="view-category" />
            <Route path="add-category" />
          </Route>
          <Route path="product" element={<ProductLayout />}>
            <Route path="view-product" />
            <Route path="add-product" />
            <Route path="update-product/:slug" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
