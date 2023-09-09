import FrontendRoutes from "./routes/index";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import CLIENT_ID from "./config/google.config";

function App() {
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
      <FrontendRoutes />
    </>
  );
}

export default App;
