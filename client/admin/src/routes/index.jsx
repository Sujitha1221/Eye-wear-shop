import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";
import DeliveryDriverLayout from "../layouts/DeliveryDriverLayout";
import DeliveryDriverViewLayout from "../layouts/DeliveryDriverViewLayout";
import CategoryLayout from "../layouts/CategoryLayout";
import ProductLayout from "../layouts/ProductLayout";
import "antd/dist/reset.css";
import ViewRating from "../views/ViewRating";
import Dashboard from "../views/Dashboard";
import GetRatingForProduct from "../views/GetRatingForProduct";
import GiveRating from "../views/GiveRating";
import CommonLayout from "../layouts/CommonLayout";
import UserLayout from "../layouts/UserLayout";
import LogOut from "../layouts/LogoutLayout";
import DriverLayout from "../layouts/DriverLayout";
import SignIn from "../layouts/CommonLayout/SignIn";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/ratings" element={<ViewRating />} />
            <Route path="/profile" />
          </Route>

          <Route element={<CommonLayout />}>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" />
          </Route>

          <Route element={<UserLayout />}>
            <Route path="view-user" />
          </Route>

          <Route element={<LogOut />}>
            <Route path="/logout" />
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
            <Route path="all-products" />
          </Route>
          <Route path="/product/rating" element={<GetRatingForProduct />} />
          <Route path="/product/give-rating" element={<GiveRating />} />
          <Route path="/driver/*" element={<DriverLayout />} />
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
