"use client";

import { useAuthGuard } from "@/lib/auth/useAuthGuard";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ children, redirectTo = "/auth/login", requireAuth = true }: ProtectedRouteProps) {
  const { isLoading, shouldRender } = useAuthGuard({ redirectTo, requireAuth });

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Only render children if auth requirements are met
  if (!shouldRender) {
    return null; // Will redirect via useAuthGuard
  }

  return <>{children}</>;
}
