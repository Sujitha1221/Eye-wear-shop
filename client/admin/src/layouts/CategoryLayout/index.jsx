import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "../../components/SideNav";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import ViewCategory from "./ViewCategory";
import AddCategory from "./AddCategory";

const CategoryLayout = () => {
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
                <Route path="view-category" element={<ViewCategory />} />
                <Route path="add-category" element={<AddCategory />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryLayout;
