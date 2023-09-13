import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const logOut = (e) => {
  e.preventDefault();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let navigate = useNavigate();
  
  console.log("delete");
  localStorage.removeItem("AdminInfo");
  navigate("/");
}

export default function LogOut() {
  useEffect(() => {
    // Call the logOut function when the component is mounted
    logOut();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      {/* You can add content for the LogOut page if needed */}
    </div>
  );
}
