import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
