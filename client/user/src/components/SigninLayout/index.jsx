import React, { useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import CLIENT_ID from "../../config/google.config";
// import { Navigate } from "react-router-dom";

export default function SignIn() {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

//   let navigate = useNavigate();

   const onSuccess = (res) => {
    console.log("login success",res.profileObj);
    window.location.replace("/home")
   }

   const onFailure = (res) => {
    console.log("login failed",res)
   }

   const  handleSubmit = (e) => {
    e.preventDefault();
    try {
         axios
          .post("http://localhost:8080/user/login/", {
            email,
            password,
          })
          .then(res => {
            window.localStorage.setItem("UserInfo",JSON.stringify(res.data.user))
            console.log(res.data)
            window.location.replace("/home");
           
           
          }).catch(err=>console.log(err))
          
      } catch (e) {
        console.log(e);
      }
  }

    return (
      <>
        <div
      className="flex min-h-screen justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://www.chashmay.com.pk/images/blogs/8738Thickvs.ThinSunglassesFrames.jpg')` // Replace with the actual path to your background image
        

      }}
    >
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="mt-6 space-y-6" action="#" method="POST">
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
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-stone-500 hover:text-black">
                      Forgot password?
                    </a>
                  </div>
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
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <br/>
                <GoogleLogin className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                clientId={CLIENT_ID}
                buttonText="Login"
                onClick={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}></GoogleLogin>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?
              <a href="/signup" className="font-semibold leading-6 text-gray-800 hover:text-black">
                  Sign Up
              </a>
            </p>
          </div>
        </div>
        </div>
      </>
    )
  }