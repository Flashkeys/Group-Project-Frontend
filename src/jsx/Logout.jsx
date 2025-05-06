import React, { useEffect } from 'react';

const Logout = () => {

  useEffect(() => {
    // Remove the current user from local storage
    localStorage.removeItem("currentUser");
  }, []);

  return (
    <div>
      <h1>Logging Out...</h1>
      <p>You are being logged out.</p>
    </div>
  );
};

export default Logout;