import { useAuthStore } from "@/lib/auth/authStore";

// Simple hook to access auth state and actions
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };
}

// Selector hooks for specific pieces of state (for performance)
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

export default useAuth;
