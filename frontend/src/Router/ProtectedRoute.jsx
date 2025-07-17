import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
