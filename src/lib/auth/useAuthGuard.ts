import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "./authStore";
import { authEvents } from "./authEvents";

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { redirectTo = "/auth/login", requireAuth = true } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    // If auth is required but user is not authenticated, redirect
    if (requireAuth && !isAuthenticated) {
      console.log("🔒 [AuthGuard] User not authenticated, redirecting to:", redirectTo);
      router.push(redirectTo);
      return;
    }

    // If auth is not required but user is authenticated, redirect to dashboard
    if (!requireAuth && isAuthenticated) {
      console.log("🔒 [AuthGuard] User already authenticated, redirecting to dashboard");
      router.push("/dashboard");
      return;
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  useEffect(() => {
    // Subscribe to auth events for real-time logout
    const unsubscribe = authEvents.subscribe((event) => {
      if (event.type === "TOKEN_EXPIRED" || event.type === "UNAUTHORIZED") {
        console.log("🔒 [AuthGuard] Auth event received, user will be redirected");
        // The auth store will handle the redirect, but we can add additional logic here if needed
      }
    });

    return unsubscribe;
  }, []);

  return {
    isAuthenticated,
    isLoading,
    shouldRender: isLoading || (requireAuth ? isAuthenticated : !isAuthenticated),
  };
}
