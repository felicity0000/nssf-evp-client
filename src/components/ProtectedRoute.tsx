import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isLoggedIn, role } = useAppContext();

  if (role === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin-assign" replace />;
    } else if (role === "employee") {
      return <Navigate to="/all-feedbacks" replace />;
    } else if (role === "problem_solver") {
      return <Navigate to="/resolve" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;