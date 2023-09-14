import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import axios from "axios";
import Header from "../HeaderLayout";
import Footer from "../FooterLayout";
import { toPng } from 'html-to-image';


const Payment = () => {
  const [products, setProducts] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [paymentType, setPaymentType] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCVV] = useState();
  const [cardDate, setCardDate] = useState();
  var [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState("");
  const [userEmail, setUserEmail] = useState(
    JSON.parse(localStorage.getItem("UserInfo")).email
  );
  const elementRef = useRef(null);

  useEffect(() => {
    function getAllProducts() {
      setProducts(JSON.parse(localStorage.getItem("cart")));
    }
    getAllProducts();
  }, []);

  const printBill = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Receipt";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  function makePayment(e) {
    e.preventDefault();

    amount = 0;
    products.forEach((product) => {
      amount += product.price * product.selectedQuantity;
    });
    setAmount(amount);

    if (!address) {
      setErrors("Please provide a address");
      return;
    }

    if (!phoneNumber) {
      setErrors("Please provide a phone number");
      return;
    } else if (phoneNumber.length != 10) {
      setErrors("phone number must 10 characters");
      return;
    }

    if (!paymentType) {
      setErrors("Please provide a payment type");
      return;
    }

    if (!cardNumber) {
      setErrors("Please provide a card number");
      return;
    } else if (cardNumber.length != 10) {
      setErrors("card number must 10 characters");
      return;
    }

    if (!cvv) {
      setErrors("Please provide a cvv");
      return;
    }

    printBill();

    axios
      .post("http://localhost:8080/payment/new-payment", {
        products,
        userName: userEmail,
        paymentType,
        cardNumber,
        amount,
      })
      .then((res) => {
        console.log(res.data);
        var paymentId = res.data._id;
        axios
          .get("http://localhost:8080/delivery-driver/get-min-order-driver")
          .then((res) => {
            var driverId = res.data._id;

            axios
              .post("http://localhost:8080/delivery/assign-delivery", {
                paymentId,
                driverId,
                address,
                phoneNumber,
              })
              .then((res) => {
                console.log(res.data);
                
                localStorage.removeItem("cart");
                window.location.replace(
                  "http://localhost:4000/product/all-products"
                );
              })
              .catch((err) => {
                console.error("Error : " + err.message);
              });
          })
          .catch((err) => {
            console.error("Error : " + err.message);
          });
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });

    const productDataString = JSON.stringify(productData);
    localStorage.setItem("productData", productDataString);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#475569",
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

  return (
    <>
      <Header></Header>
      <div className="w-full">
        <div className="w-full flex justify-center mt-6 bg-white">
          <TableContainer component={Paper} sx={{ width: 800 }} ref={elementRef}>
            <Table aria-label="spanning table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={3}>
                    Details
                  </StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Qty</StyledTableCell>
                  <StyledTableCell align="center">
                    Price Per Unit
                  </StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {product.productName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product.selectedQuantity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {product.price}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Math.floor(product.price * product.selectedQuantity)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <TableCell colSpan={3} align="right">
                    Total
                  </TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="flex flex-col align-items w-full mt-6">
        <div className="px-[20px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          Personal Details
        </div>
        <div className="flex justify-center grid grid-cols-2">
          <div className="p-4 flex justify-center">
            <TextField
              label="Address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              type="number"
              label="Phone Number"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col align-items w-full mt-6">
        <div className="px-[20px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          Payment Details
        </div>
        <div className="flex justify-center grid grid-cols-3">
          <div className="col-span-3 p-4 flex justify-center">
            <label style={{fontSize: 17}}>
              <input
                type="radio"
                value="credit"
                name="card"
                onChange={(e) => setPaymentType(e.target.value)}
              />
              Credit Card
            </label>
            <label style={{fontSize: 17}}>
              <input
                type="radio"
                value="debit"
                name="card"
                onChange={(e) => setPaymentType(e.target.value)}
                style={{marginLeft: 27}}
              />
              Debit Card
            </label>
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              type="number"
              label="Card Number"
              name=""
              onChange={(e) => setCardNumber(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              label="CVV"
              onChange={(e) => setCVV(e.target.value)}
              name="cvv"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              type="date"
              label=" "
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 flex justify-center pt-5">
        {errors ? (
          <div className="w-full justify-center text-center px-[20px] py-[10px] border-2 border-red-700 bg-red-100 text-red-700 rounded text-xs">
            {errors ? errors : ""}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="h-[64px] fixed bottom-0 w-full px-[20px] flex justify-end items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]  z-10 bg-white">
        <button
          type="submit"
          onClick={makePayment}
          className="bg-transparent text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Pay
        </button>
      </div>
      <h1> d</h1>
      <Footer></Footer>
    </>
  );
};

export default Payment;
