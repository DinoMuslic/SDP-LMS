import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("role") !== "admin" ? navigate("/home") : "";
  }, [navigate]);
};

export default useCheckAuth;