import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


export default function SignUp() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [nic,setNic]=useState("");
  const [address,setAddress] = useState("");
  const [phone,setPhone] = useState("");
//   const [image,setImage] = useState("");

//   function convert(e) {//function to convert image as url
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//     reader.onerror = (error) => {
//       console.log("Error: ", error);
//     };
//   }

  const  handleSubmit = (e) => {
    e.preventDefault();
    
     if (!firstname || !lastname || !email || !password || !repassword || !address || !phone || !nic) {
      alert("Fields can't be empty");
    }
    else if (password.trim().length < 8) {
      alert("Password should consist atleast 8 chracters");
    } else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      alert(
        "Password should contain a simple letter,a capital letter,a number and a special character"
      );
    } else if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      alert("Email invalid");
    }  else if (password !== repassword) {
      alert("Password Mismatch");
    } else {
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
           window.location.replace("/")
        
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

    return (
      <>
        <div
      className="flex justify-center items-center bg-cover bg-center bg-cyan-700"

    >
        <br/><br/>
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg mt-10">
          <div className="w-full">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>
  
          <div className="mt-6 sm:mt-8">
            <form className="mt-6 space-y-6" action="#" method="POST">

            <div className="flex">
  <div>
    <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
      First name
    </label>
    <div className="mt-2">
      <input
        id="fname"
        name="fname"
        type="text"
        required
        className="p-10 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          setFirstname(e.target.value);
        }}
      />
    </div>
  </div>

  <div className="ml-auto">
    <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
      Last name
    </label>
    <div className="mt-2">
      <input
        id="lname"
        name="lname"
        type="text"
        required
        className="p-10 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          setLastname(e.target.value);
        }}
      />
    </div>
  </div>
</div>



              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                  />
                </div>
              </div>

              <div className="flex">
  <div>
    <label htmlFor="nic" className="block text-sm font-medium leading-6 text-gray-900">
      NIC
    </label>
    <div className="mt-2">
      <input
        id="nic"
        name="nic"
        type="text"
        required
        className="p-10 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          setNic(e.target.value);
        }}
      />
    </div>
  </div>

  <div className="ml-auto">
    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
      Phone Number
    </label>
    <div className="mt-2">
      <input
        id="phone"
        name="phone"
        type="text"
        required
        className="p-10 flex justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
    </div>
  </div>
</div>

    
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setAddress(e.target.value);
                     }}
                  />
                </div>
              </div>

       
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setRePassword(e.target.value);
                     }}
                  />
                </div>
              </div>
              <div>
                {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Add Image
                </label> */}
                {/* <div className="mt-2">
                  <input
                    type="file"
                    placeholder="Add Image"
                    accept="image/"
                    // eslint-disable-next-line react/no-unknown-property
                    filename="image"
                    onChange={convert}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    
                  />
                </div> */}
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </>
    )
  }