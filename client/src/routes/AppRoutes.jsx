import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const OnboardingFlow = lazy(() => import("@/features/auth/components/OnboardingFlow"));

const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const PlannerPage = lazy(() => import("@/features/planner/pages/PlannerPage"));
const SubjectsPage = lazy(() => import("@/features/subjects/pages/SubjectsPage"));
const SubjectDetailPage = lazy(() => import("@/features/subjects/pages/SubjectDetailPage"));
const AnalyticsPage = lazy(() => import("@/features/analytics/pages/AnalyticsPage"));
const ResourcesPage = lazy(() => import("@/features/resources/pages/ResourcesPage"));
const PYQAnalyzerPage = lazy(() => import("@/features/pyq-analyzer/pages/PYQAnalyzerPage"));
const AIAssistantPage = lazy(() => import("@/features/ai-assistant/pages/AIAssistantPage"));
const FutureSelfPage = lazy(() => import("@/features/future-self/pages/FutureSelfPage"));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding/*" element={<OnboardingFlow />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:id" element={<SubjectDetailPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/pyq-analyzer" element={<PYQAnalyzerPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/future-self" element={<FutureSelfPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
