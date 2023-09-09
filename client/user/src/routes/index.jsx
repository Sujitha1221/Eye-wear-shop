// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {gapi} from "gapi-script";
import CLIENT_ID from "../config/google.config";
import SignIn from "../components/SigninLayout";
import SignUp from "../components/SignupLayout";
import Header from "../components/HeaderLayout/index";
import Footer from "../components/FooterLayout";
import Home from "../components/HomeLayout";
import Profile from "../components/ProfileLayout";
import LogOut from "../components/LogoutLayout";

const FrontendRoutes = () => {
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:CLIENT_ID,
        scope: ""
      })
    }
    gapi.load('client:auth2',start)
  })
  return (
    <>
      <Router>
        <Routes>
          
           <Route exact path="/" element={<SignIn />}/> 
          <Route exact path="/signup" element={<SignUp />}/> 
          <Route exact path="/header" element={<Header/>}/>
          <Route exact path="/footer" element={<Footer/>}/>
           <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/profile" element={<Profile/>}/> 
          <Route exact path="/logout" element={<LogOut/>}/> 


        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
