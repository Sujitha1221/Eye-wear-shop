import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import CommonLayout from "../layouts/CommonLayout";
import UserLayout from "../layouts/UserLayout";
import LogOut from "../layouts/LogoutLayout";
import DriverLayout from "../layouts/DeliveryDriverLayout";



const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
             <Route path="/admin" /> 
             <Route path="/profile" />
          </Route>

          <Route element={<CommonLayout />}>
            <Route path="/" />
            <Route path="signup"/>
          </Route>

          <Route element={<UserLayout />}>
            <Route path="view-user" />
          </Route>

          <Route element={<LogOut />}>
            <Route path="/logout" />
          </Route>

          <Route element={<DriverLayout />}>
            <Route path="/driver" />
          </Route>
        </Routes>

        
        
      </Router>
    </>
  );
};

export default FrontendRoutes;
