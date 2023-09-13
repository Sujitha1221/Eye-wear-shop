import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './forgotpassword';
import ResetPassword from './ResetPassword';


const ForgotPasswordLayout = () => {
    return (
        <>
        <Routes>
        <Route>
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:id" element={<ResetPassword />} />
        </Route>
      </Routes>
            
 </>
           
    );
}

export default ForgotPasswordLayout;
