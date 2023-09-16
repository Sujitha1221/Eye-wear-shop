import React from 'react';
import { GoogleLogin } from 'react-google-login';

// eslint-disable-next-line react/prop-types
const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = "78830823346-fo1s8j2khg23am3n01hhui70jnvjagrf.apps.googleusercontent.com"; // Replace with your actual client ID

  const handleSuccess = (response) => {
    // Handle the successful authentication here
    console.log('Google authentication successful', response);
    if (onSuccess) {
      onSuccess(response);
    }
  };

  const handleFailure = (error) => {
    // Handle authentication failure here
    console.error('Google authentication failed', error);
    if (onFailure) {
      onFailure(error);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
         // Replace with your desired cookie policy
      />
    </div>
  );
};

export default GoogleLoginButton;
