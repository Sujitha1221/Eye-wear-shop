import React, { useEffect } from 'react';

const logOut = (e) => {
  console.log("delete");
  localStorage.removeItem("UserInfo");
  window.location.replace("/");
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
