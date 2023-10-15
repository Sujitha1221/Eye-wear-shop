import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "../../components/SideNav";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import UpdateProduct from "./UpdateProduct";
import AllProducts from "./AllProducts";

const ProductLayout = () => {
  return (
    <>
      <div className="flex sticky top-0 left-0">
        <SideNav />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="p-[20px] overflow-y-scroll pt-20">
            <Outlet />
            <Routes>
              <Route>
                <Route path="view-product" element={<ViewProduct />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="all-products" element={<AllProducts />} />
                <Route
                  path="update-product/:slug"
                  element={<UpdateProduct />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLayout;
