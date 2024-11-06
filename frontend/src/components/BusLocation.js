import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext); // Get logout function from context
  const history = useHistory();

  const handleLogout = () => {
    logoutUser(); // Remove user from context and localStorage
    history.push("/login"); // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
