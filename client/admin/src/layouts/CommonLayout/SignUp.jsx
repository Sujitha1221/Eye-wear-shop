import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !repassword ||
      !address ||
      !phone ||
      !nic
    ) {

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !repassword ||
      !address ||
      !phone ||
      !nic
    ) {
      alert("Fields can't be empty");
    } else if (nic.length !== 12) {
      alert("NIC should consist of 12 characters");
    } else if (password.trim().length < 8) {
      alert("Password should consist of at least 8 characters");
    } else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      alert(
        "Password should contain a lowercase letter, an uppercase letter, a number, and a special character"
      );
    } else if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      alert("Invalid Email");
    } else if (password !== repassword) {
      alert("Password Mismatch");
    } else if (!phone.match(/^\d{10}$/)) {
      alert("Phone Number should contain only 10 numbers");
    } else {
      axios
      axios
        .post("http://localhost:8080/admin/add", {
          firstname,
          lastname,
          email,
          password,
          nic,
          address,
          phone,
        })
        .then(() => {
          alert("Inserted new Admin");
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // Function to populate form fields with demo data
  const handleDemoClick = () => {
    setFirstname("John");
    setLastname("Doe");
    setEmail("johndoe@gmail.com");
    setPassword("asdQWE123#");
    setRePassword("asdQWE123#");
    setNic("123456789011");
    setAddress("1234, Hill Street");
    setPhone("1234567890");
  };

  return (
    <>
      <div className="flex justify-center items-center bg-cover bg-center bg-cyan-700">
        <br />
        <br />
  return (
    <>
      <div className="flex justify-center items-center bg-cover bg-center bg-cyan-700">
        <br />
        <br />
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg mt-10">
          <div className="w-full">
            <div className="flex justify-center text-black text-2xl font-semibold italic mt-5">
              <FontAwesomeIcon className="mr-[10px]" icon={faGlasses} /> SolarFlare
            </div>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>


          <div className="mt-6 sm:mt-8">
            <form className="mt-6 space-y-6" action="#" method="POST">
              <div className="flex">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fname"
                      name="fname"
                      type="text"
                      required
                      className="p-5 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      value={firstname}
                    />
                  </div>
                </div>

                <div className="ml-auto">
                  <label
                    htmlFor="lname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lname"
                      name="lname"
                      type="text"
                      required
                      className="p-5 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                      value={lastname}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
              </div>

              <div className="flex">
                <div>
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NIC
                  </label>
                  <div className="mt-2">
                    <input
                      id="nic"
                      name="nic"
                      type="text"
                      required
                      className="p-5 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setNic(e.target.value);
                      }}
                      value={nic}
                    />
                  </div>
                </div>

                <div className="ml-auto">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      className="p-5 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="block p-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={address}
                  />
                </div>
              </div>


              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block p-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block p-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setRePassword(e.target.value);
                    }}
                    value={repassword}
                  />
                </div>
              </div>
            </form>
          </div>
          <br/>

          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            <span className="mr-5"></span>{" "}

           
        
        
            <br />
          </div>
        <div>

          <div className="flex items-center justify-center text-sm">
            <a
              href="/forgot"
              className="font-semibold text-cyan-700 hover:text-black"
            >
              Have an account?
            </a>
            <span className="mr-5"></span>{" "}
            <a
              type="submit"
              href="/"
              className="rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </a>

           
            

            
          </div>
          <br/>
          <div className="flex justify-center">
          <button
          type="button"
          onClick={handleDemoClick}
          className="flex justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Demo
        </button>
        </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
