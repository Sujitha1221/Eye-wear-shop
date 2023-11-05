import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const AllProducts = React.forwardRef((props, ref) => {
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

  const componentPDF = useRef();
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

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Products",
    onAfterPrint: () => window.location.replace("/product/all-products"),
  });
  return (
    <>
      <div className="flex justify-end">
        <div className="mr-6"></div>
        <button
          className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={generatePDF}
        >
          Generate Report
        </button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table ref={componentPDF}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">In Stock</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default AllProducts;
