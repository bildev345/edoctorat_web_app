import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length) {
    const roles = user?.roles || [];
    const ok = allowedRoles.some((r) => roles.includes(r));
    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
}
