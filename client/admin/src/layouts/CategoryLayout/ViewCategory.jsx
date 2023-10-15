import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Modal } from "antd";
import { TextField } from "@mui/material";

const ViewCategory = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1d93bc",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/category/update-category/${selected._id}`,
        { categoryName: updatedName }
      );
      if (data.success) {
        alert(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleDelete = async (pId) => {
    var result = window.confirm("Do you want to delete this driver ?");

    if (result == true) {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/category/delete-category/${pId}`
      );
      if (data.success) {
        alert("Category is deleted");
        getAllCategory();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }
  };

  return (
    <>
      <div className="flex  justify-end">
        <Link to="/category/add-category">
          <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add Category
          </button>
        </Link>
      </div>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((c) => (
              <StyledTableRow key={c._id}>
                <StyledTableCell component="th" scope="row">
                  {c.categoryName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => {
                      setVisible(true);
                      setUpdatedName(c.categoryName);
                      setSelected(c);
                    }}
                  >
                    <ModeEditIcon />
                  </button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="bg-transparent text-red-600 border-red-600 hover:bg-cyan-600 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => {
                      handleDelete(c._id);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
        <form onSubmit={handleUpdate}>
          <div className="flex justify-center grid grid-cols-2 gap-4 p-10">
            <div className="col-span-2 p-4">
              <TextField
                label="Category Name"
                variant="outlined"
                style={{ width: "100%" }}
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="col-span-2 flex justify-center pt-5">
              <button
                type="submit"
                className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Update Category
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ViewCategory;
