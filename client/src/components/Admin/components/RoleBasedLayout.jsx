import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedLayout = ({ allowedRoles, redirectPath = "/" }) => {
  const { user, loading } = useSelector((state) => state.userSlice);

  if (!user) return <Navigate to={redirectPath} replace />;

  if (!allowedRoles.includes(user.role)) return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};

export default RoleBasedLayout;
