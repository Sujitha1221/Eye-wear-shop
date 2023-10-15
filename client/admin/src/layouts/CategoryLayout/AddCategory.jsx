import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/category/create-category",
        { categoryName }
      );
      if (data?.success) {
        alert(`${categoryName} is created`);
        window.location.replace("/category/view-category");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting category");
    }
  };

  return (
    <>
      <div className="flex flex-col align-items w-full min-h-[85vh]">
        <div className="px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          Add Category
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center grid grid-cols-2 gap-4 p-10">
            <div className="col-span-2 p-4">
              <TextField
                label="Category Name"
                variant="outlined"
                style={{ width: "100%" }}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="col-span-2 flex justify-center pt-5">
              <button
                type="submit"
                className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
