import FrontendRoutes from "./routes/index";
// import CLIENT_ID from "./config/google.config";
// import { useEffect } from "react";
// import {gapi} from 'gapi-script';



function App() {
  // useEffect(()=>{
  //   function start(){
  //     gapi.client.init({
  //       clientID: CLIENT_ID,        // Replace with your actual client ID
  //     clientSecret: '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',  // Replace with your actual client secret
  //     callbackURL: 'http://localhost:4000/', // Replace with your actual callback URL
  //     scope: ['profile', 'email'], 
       
  //     })

  //   }
  //   gapi.load('client:auth2',start);

  // })

 

  return (
    <>
      <FrontendRoutes />
    </>
  );
}

export default App;
