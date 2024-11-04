import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si hay un token guardado
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1); // Regresa a la página anterior si el usuario está yá autenticado
    }
  }, [navigate]);

  return children;
};

export default RedirectIfAuth;
