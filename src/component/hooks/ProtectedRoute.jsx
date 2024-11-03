import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem("user");

    if (!token) {
      return <Navigate to="/login" />;
    }

    return children; 
  };
};
