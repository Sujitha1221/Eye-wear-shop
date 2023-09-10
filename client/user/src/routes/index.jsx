import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductLayout from "../components/ProductLayout";
import Payment from "../components/PaymentLayout/Payment";
import SignIn from "../components/SigninLayout";
import SignUp from "../components/SignupLayout";
import Header from "../components/HeaderLayout/index";
import Footer from "../components/FooterLayout";
import Home from "../components/HomeLayout";
import Profile from "../components/ProfileLayout";
import LogOut from "../components/LogoutLayout";
import ForgotPassword from "../components/ForgotPasswordLayout";
import ResetPassword from "../components/ForgotPasswordLayout/resetPassword";


const FrontendRoutes = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/product/*" element={<ProductLayout />}>
            <Route path="all-products" />
            <Route path="view-product/:slug" />
          </Route>
          <Route path="/payment" element={<Payment />} />
          
           <Route exact path="/" element={<SignIn />}/> 
          <Route exact path="/signup" element={<SignUp />}/> 
          <Route exact path="/header" element={<Header/>}/>
          <Route exact path="/footer" element={<Footer/>}/>
           <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/profile" element={<Profile/>}/> 
          <Route exact path="/logout" element={<LogOut/>}/> 
          <Route exact path="/forgot" element={<ForgotPassword/>}/> 
          <Route exact path="/reset" element={<ResetPassword/>}/> 
           
          


        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
