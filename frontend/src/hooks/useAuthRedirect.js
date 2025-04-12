import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ["/home", "/login", "/register"];
    const token = localStorage.getItem("token");

    if (!token && !publicPaths.includes(location.pathname)) {
      navigate("/home");
    }
  }, [location, navigate]);
};

export default useAuthRedirect;
