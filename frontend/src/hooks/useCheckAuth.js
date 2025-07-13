import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const useCheckAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/home");
    }
  }, [user, navigate]);
};

export default useCheckAuth;