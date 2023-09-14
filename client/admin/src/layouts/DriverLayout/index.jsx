import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import axios from "axios";
import Header from "../../components/Header";

const DriverLayout = () => {
  const [deliveries, setAllDeliveries] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [driverId, setDriverId] = useState(
    JSON.parse(localStorage.getItem("DriverInfo"))._id
  );

  useEffect(() => {
    function getAllDeliveries() {
      axios
        .get(
          `http://localhost:8080/delivery/get-delivery-by-driver-id/${driverId}`
        )
        .then((res) => {
          console.log(res.data);
          setAllDeliveries(res.data);
          //setAllDeliveries(deliveries.filter((delivery) => delivery.status == "Order Confirmed"));
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });
    }

    getAllDeliveries();
  }, []);

  const updateDelivered = (_id) => {
    axios
      .put(`http://localhost:8080/delivery/update-delivery-status`, {
        _id,
        status: "Delivered",
      })
      .then((res) => {
        if (res.data.status != null) {
          axios
            .get(`http://localhost:8080/delivery/get-delivery-by-id/${_id}`)
            .then((res) => {
              var _id = res.data.driverId;
              if (res.data != null) {
                axios
                  .get(
                    `http://localhost:8080/delivery-driver/driver-deliver/${_id}`
                  )
                  .then((res) => {
                    if (res.data != null) {
                      window.location.replace("/driver");
                    }
                  })
                  .catch((err) => {
                    console.error("Error : " + err.message);
                  });
              }
            })
            .catch((err) => {
              console.error("Error : " + err.message);
            });
        }
        //window.location.replace("/delivery-driver-view/view-delivery-driver");
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
  };

  const updateDispatched = (_id) => {
    axios
      .put(`http://localhost:8080/delivery/update-delivery-status`, {
        _id,
        status: "Dispatched",
      })
      .then((res) => {
        if (res.data.status != null) window.location.replace("/driver");
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
  };

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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  return (
    <>
      <Header />
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Delivery ID</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries ? (
              deliveries.filter((key) => {
                const status = (key.status || "").toLowerCase();
                return (
                  status.includes("order confirmed") || status.includes("dispatched")
                );
              }).map((delivery) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {" "}
                    {delivery._id}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {delivery.address}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {delivery.phoneNumber}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    {delivery.status}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      onClick={() => updateDispatched(delivery._id)}
                      className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      <SendTimeExtensionIcon />
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      onClick={() => updateDelivered(delivery._id)}
                      className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      <DeliveryDiningIcon />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DriverLayout;
