import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useContext(AuthContext);
  const loaction = useLocation();
  const { user } = useSelector((state) => state.user);
  return allowedRole.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.name ? (
    <Navigate to="/" state={{ from: loaction }} replace />
  ) : (
    <Navigate to="/login" state={{ from: loaction }} replace />
  );
};

export default RequireAuth;
