import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/zustand/auth.store";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
