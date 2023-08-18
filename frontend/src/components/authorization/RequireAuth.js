import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useContext(AuthContext);
  const loaction = useLocation();
  return allowedRole.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.name ? (
    <Navigate to="/" state={{ from: loaction }} replace />
  ) : (
    <Navigate to="/login" state={{ from: loaction }} replace />
  );
};

export default RequireAuth;
