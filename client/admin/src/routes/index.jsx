import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ViewRating from "../views/ViewRating";
import Dashboard from "../views/Dashboard";
import GetRatingForProduct from "../views/GetRatingForProduct";
import GiveRating from "../views/GiveRating";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ratings" element={<ViewRating />} />
          </Route>
          <Route path="/product/rating" element={<GetRatingForProduct />} />
          <Route path="/product/give-rating" element={<GiveRating />} />
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
