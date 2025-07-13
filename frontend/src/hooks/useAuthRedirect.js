import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const publicPaths = ["/home", "/login", "/register"];
    const isPublic = publicPaths.includes(location.pathname);

    if (!user && !isPublic) {
      navigate("/home", { replace: true });
    }
  }, [user, location, navigate]);
};

export default useAuthRedirect;
