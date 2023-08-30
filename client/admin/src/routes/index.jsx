import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
