import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Mengambil data dari sessionStorage
  const token = sessionStorage.getItem("Tokens");
  const userRole = sessionStorage.getItem("role");

  const isAuthenticated = token;                    

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={"/"} />; // Redirect jika role tidak sesuai
  }

  return children;
};

export default ProtectedRoute;
