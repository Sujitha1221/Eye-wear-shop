import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";
import DeliveryDriverLayout from "../layouts/DeliveryDriverLayout";

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
          </Route>
          <Route path="delivery-driver" element={<DeliveryDriverLayout />}>
            <Route path="view-delivery-driver" />
            <Route path="add-delivery-driver" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
