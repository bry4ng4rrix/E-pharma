import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requireSuperuser = false }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  const isActive = localStorage.getItem("is_active") === "true";
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isActive) {
    return <Navigate to="/inactive" replace />;
  }

  if (requireSuperuser && !isSuperuser) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;