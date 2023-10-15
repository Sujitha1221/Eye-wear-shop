import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProfile = () => {
  let navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");

  var admin = JSON.parse(localStorage.getItem("AdminInfo"));
  const id = admin._id;
  var admin = JSON.parse(localStorage.getItem("AdminInfo"));
  const id = admin._id;

  useEffect(() => {
    function GET() {
      axios
        .get(`http://localhost:8080/admin/get/${id}`)
        .then((res) => {
          setFirstname(res.data.admin.firstname);
          setLastname(res.data.admin.lastname);
          setEmail(res.data.admin.email);
          setPassword(res.data.admin.password);
          setNic(res.data.admin.nic);
          setAddress(res.data.admin.address);
          setPhone(res.data.admin.phone);
        })
        .catch((err) => {
          setErrors(err.message);
        });
    }

    GET();
  }, []);

  async function updateData(e) {
  async function updateData(e) {
    e.preventDefault();

    if (!phone.match(/^\d{10}$/)) {
      setErrors("Phone Number should contain only 10 numbers");
    } else {
      const updateAdmin = { firstname, lastname, password, address, phone };
      await axios
        .put(`http://localhost:8080/admin/update/${admin._id}`, updateAdmin)
        .then((res) => {
          if (res.data === "Done") {
            setErrors("Admin updated successfully ");
            navigate("/profile");
          } else {
            setErrors("Couldn't update profile");
            navigate("/admin");
          }
        })
        .catch((msg) => {
          setErrors(msg);
        });
    }
  }
  }

  async function deleteData(e) {
    e.preventDefault();

    // Show a confirmation dialog to the user
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );

    if (confirmed) {
      axios
        .delete(`http://localhost:8080/admin/delete/${admin._id}`)
        .then((res) => {
          if (res.data === "success") {
            navigate("/signUp");
          } else if (res.data === "failed") {
            setErrors("Error deleting your profile");
          }
        })
        .catch((err) => {
          setErrors(err);
        });
    }
  }

  return (
    <>
      <div className="flex flex-col align-items w-full min-h-[85vh]">
        <div className="px-[20px] h-[64px] font-bold text-xl w-full flex justify-center items-center gap-[20px]">
          My profile
        </div>
        <div className="flex justify-center grid grid-cols-2 gap-4 p-10">
          <div className="p-4 flex justify-center">
            <TextField
              label="First Name"
              value={firstname}
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              label="Last Name"
              value={lastname}
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
          <div className="col-span-2 p-4">
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              style={{ width: "100%" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled
            />
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              label="NIC Number"
              variant="outlined"
              value={nic}
              style={{ width: "100%" }}
              onChange={(e) => {
                setNic(e.target.value);
              }}
              disabled
            />
          </div>
          <div className="p-4 flex justify-center">
            <TextField
              type="text"
              label="Phone Number"
              variant="outlined"
              value={phone}
              style={{ width: "100%" }}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="col-span-2 p-4">
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              style={{ width: "100%" }}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={updateData}
            className="w-48 bg-transparent text-cyan-600 ml-100 border-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Update
          </button>
          <span className="mr-10"></span>{" "}
          <button
            type="submit"
            onClick={deleteData}
            className="w-48  bg-transparent text-rose-700 border-rose-700 hover:bg-rose-700 hover:text-white font-semibold  py-2 px-4 border border-rose-700 hover:border-transparent rounded"
          >
            Delete
          </button>
        </div>
        <div className="col-span-2 flex justify-center pt-5"> 
          {errors ? (
            <div className="w-full justify-center text-center px-[20px] py-[10px] border-2 border-red-700 bg-red-100 text-red-700 rounded text-xs">
              {errors ? errors : ""}
            </div>
          ) : (
            <></>
          )}
          </div>
      </div>
    </>
  );
};

export default AdminProfile;
