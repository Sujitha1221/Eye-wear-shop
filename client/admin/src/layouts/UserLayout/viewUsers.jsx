/* eslint-disable react/jsx-key */
import React from "react";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useReactToPrint} from "react-to-print";

const ViewUsers = () => {
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

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function getUsers() {
      axios
        .get(`http://localhost:8080/user/`)
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getUsers();
  }, []);

  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"User data"
  });

  return (
    <>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          ></input>
          
        </div>
      </form>
      <div ref={componentPDF}>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((u) => {
                const firstName = (u.firstname || "").toLowerCase();
                const lastName = (u.lastname || "").toLowerCase();
                return (
                  firstName.includes(query.toLowerCase()) ||
                  lastName.includes(query.toLowerCase())
                );
              })
              .map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {" "}
                    {user._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.email || ""}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.firstname || ""}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.lastname || ""}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <br />

      <div className="flex justify-center">
        <button
          type="submit"
          onClick={generatePDF}
          className="w-48  bg-transparent text-cyan-600 ml-100 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Generate PDF
        </button>
      </div>
    </>
  );
};

export default ViewUsers;
