import { create } from "zustand";
import { persist } from "zustand/middleware";
import AuthStorage, { type StoredUser } from "./storage";

interface AuthState {
  // State
  user: StoredUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (tokens: { accessToken: string; refreshToken: string }, user: StoredUser) => void;
  logout: () => void;
  updateUser: (user: StoredUser) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      login: (tokens, userData) => {
        console.log("🔐 AuthStore: Logging in user:", userData.name);

        // Store in localStorage
        AuthStorage.setAuthData(tokens, userData);

        // Update Zustand state
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        console.log("🔐 AuthStore: Logging out user");

        // Clear localStorage
        AuthStorage.clearAuthData();

        // Update Zustand state
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Redirect to home
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      },

      updateUser: (userData) => {
        console.log("🔐 AuthStore: Updating user data");

        // Update localStorage
        AuthStorage.setUser(userData);

        // Update Zustand state
        set({
          user: userData,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      initializeAuth: () => {
        try {
          const { user: storedUser } = AuthStorage.getAuthData();

          if (storedUser && AuthStorage.isAuthenticated()) {
            set({
              user: storedUser,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // Clear invalid/expired auth data
            AuthStorage.clearAuthData();
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Error initializing auth:", error);
          AuthStorage.clearAuthData();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-store",
      // Only persist user data, not loading state
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize auth on app start
if (typeof window !== "undefined") {
  useAuthStore.getState().initializeAuth();
}
