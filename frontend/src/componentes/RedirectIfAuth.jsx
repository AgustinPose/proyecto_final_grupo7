import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/feed'); // Redirect to feed instead of going back
    }
  }, [navigate]);

  return children;
};

export default RedirectIfAuth;