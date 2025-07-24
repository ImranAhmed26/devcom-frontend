"use client";

import { useAuth } from "@/lib/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ children, redirectTo = "/auth/login", requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const isUnauthenticated = !isAuthenticated;
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && isUnauthenticated) {
      router.push(redirectTo);
    } else if (!requireAuth && isAuthenticated) {
      // Redirect authenticated users away from auth pages
      router.push("/dashboard");
    }
  }, [isAuthenticated, isUnauthenticated, requireAuth, router, redirectTo]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show content based on auth requirements
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect
  }

  if (!requireAuth && isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
