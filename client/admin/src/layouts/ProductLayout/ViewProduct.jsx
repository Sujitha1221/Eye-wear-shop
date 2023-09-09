import React, { useState, useEffect } from "react";
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
import axios from "axios";

const ViewProduct = () => {
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
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/product/get-products"
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (pId) => {
    try {
      let answer = window.prompt("Are you sure want to delete this product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/product/delete-product/${pId}`
      );
      if (data.success) {
        alert(`Product is deleted`);
        getAllProducts();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex  justify-end">
        <Link to="/product/add-product">
          <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add Product
          </button>
        </Link>
      </div>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">In Stock</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((p) => (
              <StyledTableRow key={p._id}>
                <StyledTableCell component="th" scope="row">
                  {p.productName}
                </StyledTableCell>
                <StyledTableCell align="right">{p.price}</StyledTableCell>
                <StyledTableCell align="right" style={{ width: "30%" }}>
                  {p.description}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {p.category.categoryName}
                </StyledTableCell>

                <StyledTableCell align="right">{p.inStock}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: "30%" }}>
                  <img
                    src={`http://localhost:8080/product/get-product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.productName}
                    style={{ width: "150px", height: "100px" }}
                  />
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Link to={`/product/update-product/${p.slug}`}>
                    <button className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      <ModeEditIcon />
                    </button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="bg-transparent text-red-600 border-red-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => {
                      handleDelete(p._id);
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
    </>
  );
};

export default ViewProduct;
