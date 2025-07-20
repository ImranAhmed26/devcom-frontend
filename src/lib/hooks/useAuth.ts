import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi, { type RegisterRequest, type LoginRequest, type User } from "@/lib/api/auth";
import { TokenManager } from "@/lib/api/api";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

// Custom hook for user registration
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      console.log("🚀 useRegister: Starting registration with data:", data);
      try {
        const result = await authApi.register(data);
        console.log("🚀 useRegister: API call successful:", result);
        return result;
      } catch (error) {
        console.error("🚀 useRegister: API call failed:", error);
        throw error;
      }
    },
    onSuccess: (response) => {
      // Show success message
      console.log("✅ Registration successful:", response.data.user.name);

      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      // Redirect to dashboard or verification page
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("❌ Registration failed:", error);

      // Handle specific error cases
      if (error.code === "VALIDATION_ERROR") {
        console.error("Please check your input and try again.");
      } else if (error.code === "CONFLICT") {
        console.error("An account with this email already exists.");
      } else {
        console.error(error.message || "Registration failed. Please try again.");
      }
    },
  });
}

// Custom hook for user login
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      console.log("✅ Login successful:", response.data.user.name);

      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("❌ Login failed:", error);

      if (error.code === "UNAUTHORIZED") {
        console.error("Invalid email or password.");
      } else {
        console.error(error.message || "Login failed. Please try again.");
      }
    },
  });
}

// Custom hook for user logout
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      console.log("✅ Logged out successfully");

      // Clear all cached data
      queryClient.clear();

      // Redirect to home page
      router.push("/");
    },
    onError: (error: any) => {
      console.error("❌ Logout error:", error);
      // Even if logout fails on server, we still clear local data
      queryClient.clear();
      router.push("/");
    },
  });
}

// Custom hook to get current user profile
export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: !!TokenManager.getToken(), // Only fetch if we have a token
    select: (response) => response.data, // Extract user data from API response
    retry: (failureCount, error: any) => {
      // Don't retry if unauthorized (token expired/invalid)
      if (error?.code === "UNAUTHORIZED") {
        return false;
      }
      return failureCount < 2;
    },
  });
}

// Custom hook to check authentication status
export function useAuth() {
  const { data: user, isLoading, error } = useProfile();
  const logout = useLogout();

  const isAuthenticated = !!user && !!TokenManager.getToken();
  const isUnauthenticated = !isAuthenticated && !isLoading;

  return {
    user,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    error,
    logout: logout.mutate,
    isLoggingOut: logout.isPending,
  };
}

// Custom hook for email verification
export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: () => {
      console.log("✅ Email verified successfully");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("❌ Email verification failed:", error);
    },
  });
}

// Custom hook for password reset request
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => authApi.requestPasswordReset(email),
    onSuccess: () => {
      console.log("✅ Password reset email sent");
    },
    onError: (error: any) => {
      console.error("❌ Failed to send password reset email:", error);
    },
  });
}

// Custom hook for password reset
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) => authApi.resetPassword(token, password),
    onSuccess: () => {
      console.log("✅ Password reset successful");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error("❌ Password reset failed:", error);
    },
  });
}
