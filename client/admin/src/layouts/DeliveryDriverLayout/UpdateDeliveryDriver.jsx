import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";

const UpdateDeliveryDriver = () => {
  const { id } = useParams();

  const [deliveryDrivers, setDeliveryDriver] = useState([]);
  const [_id, setObjId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [NIC, setNIC] = useState();
  const [licenseNo, setLicenseNumber] = useState();
  const [address, setAddress] = useState();
  const [vehicleNo, setVehicleNumber] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    function getDeliveryDriver() {
      axios
        .get(
          `http://localhost:8080/delivery-driver/get-delivery-driver-by-id/${id}`
        )
        .then((res) => {
          console.log(res.data);
          setObjId(res.data._id);
          setDeliveryDriver(res.data);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          setNIC(res.data.NIC);
          setLicenseNumber(res.data.licenseNo);
          setAddress(res.data.address);
          setVehicleNumber(res.data.vehicleNo);
          setPassword(res.data.password);
          setRePassword(res.data.rePassword);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });
    }
    getDeliveryDriver();
  }, []);

  function updateDeliveryDriver(e) {
    e.preventDefault();

    if (!firstName) {
      setErrors("Please provide a first name");
      return;
    } else if (firstName.length < 4) {
      setErrors("Minimum 4 characters");
      return;
    }

    if (!lastName) {
      setErrors("Please provide a last name");
      return;
    } else if (lastName.length < 4) {
      setErrors("Minimum 4 characters");
      return;
    }

    if( !email) {
      setErrors("Please provide a email");
      return;
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(email)) {
        setErrors("Invalid email format");
        return;
      }
    }

    if (!NIC) {
      setErrors("Please provide a NIC number");
      return;
    } else if (NIC.length != 12) {
      setErrors("Nic must 12 characters");
      return;
    }

    if (!licenseNo) {
      setErrors("Please provide a License Number");
      return;
    } else if (licenseNo.length != 8) {
      setErrors("license number must 8 characters");
      return;
    }

    if (!address) {
      setErrors("Please provide a address");
      return;
    }

    if (!vehicleNo) {
      setErrors("Please provide a Vehicle Number");
      return;
    } else if (vehicleNo.length != 8) {
      setErrors("Vehicle number must 8 characters");
      return;
    }

    axios
      .put("http://localhost:8080/delivery-driver/update-delivery-driver", {
        _id,
        firstName,
        lastName,
        email,
        address,
        NIC,
        licenseNo,
        vehicleNo,
        password,
      })
      .then((res) => {
        if (res.data != null)
          window.location.replace("/delivery-driver/view-delivery-driver");
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
  }

  return (
    <>
      <div className="flex flex-col align-items w-full min-h-[85vh]">
        <div className="px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          Update Delivery Driver Details
        </div>
        <div className="flex justify-center grid grid-cols-2 gap-4 p-10">
          <div class="p-4 flex justify-center">
            <TextField
              label="First Name"
              defaultValue=" "
              value={firstName}
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Last Name"
              defaultValue=" "
              value={lastName}
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="col-span-2 p-4">
            <TextField
              label="Email"
              name="email"
              defaultValue=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="NIC Number"
              name="nic"
              defaultValue=" "
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="License Number"
              name="licenseNo"
              defaultValue=" "
              value={licenseNo}
              onChange={(e) => setLicenseNumber(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Address"
              name="address"
              defaultValue=" "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div class="p-4 flex justify-center">
            <TextField
              label="Vehicle Number"
              name="vehicleNumber"
              defaultValue=" "
              value={vehicleNo}
              onChange={(e) => setVehicleNumber(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
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
          {/* <div class="p-4 flex justify-center">
                        <TextField label="Password" name="password" defaultValue=" " value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div class="p-4 flex justify-center">
                        <TextField label="Re-Type-Password" defaultValue=" " value={password} name="rePassword" onChange={(e) => setRePassword(e.target.value)} variant="outlined" style={{ width: '100%' }} />
                    </div> */}
          <div class="col-span-2 flex justify-center pt-5">
            <button
              type="submit"
              onClick={updateDeliveryDriver}
              className="bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Update Delivery Driver
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDeliveryDriver;
