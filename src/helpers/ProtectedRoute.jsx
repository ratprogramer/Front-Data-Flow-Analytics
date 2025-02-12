import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "./decodeToken";
import Swal from "sweetalert2";

export const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
      setToken(sessionStorage.getItem("token"));
  }, []);

  if (!token) {
    Swal.fire({
      title: "Error",
      text: "No tienes acceso aún :c",
      icon: "error",
    });
    return <Navigate to="/" />;
  }

  const decode = decodeToken(token);
  if (!decode?.iat) {
    Swal.fire({
      title: "Error",
      text: "No tienes acceso aún :c",
      icon: "error",
    });
    return <Navigate to="/" />;
  }

  return children;
};
