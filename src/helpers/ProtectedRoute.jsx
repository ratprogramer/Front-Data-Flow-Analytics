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
  try {
    const decode = decodeToken(token);    

    // Verificar si el token está expirado
    if (!decode?.iat || (decode.exp && decode.exp * 1000 < Date.now())) {
      Swal.fire({
        title: "Error",
        text: "Tu sesión ha expirado. Inicia sesión nuevamente.",
        icon: "error",
      });
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Token inválido",
      icon: "error",
    });
    console.log(error);
    return <Navigate to="/" />;
  }
};