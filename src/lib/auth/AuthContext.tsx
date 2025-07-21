"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthStorage, { type StoredUser } from "./storage";

interface AuthContextType {
  // Auth state
  user: StoredUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth actions
  login: (tokens: { accessToken: string; refreshToken: string }, user: StoredUser) => void;
  logout: () => void;
  updateUser: (user: StoredUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const { user: storedUser } = AuthStorage.getAuthData();

        if (storedUser && AuthStorage.isAuthenticated()) {
          setUser(storedUser);
        } else {
          // Clear invalid/expired auth data
          AuthStorage.clearAuthData();
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        AuthStorage.clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (tokens: { accessToken: string; refreshToken: string }, userData: StoredUser) => {
    console.log("🔐 AuthContext: Logging in user:", userData.name);

    // Store auth data
    AuthStorage.setAuthData(tokens, userData);

    // Update state
    setUser(userData);
  };

  const logout = () => {
    console.log("🔐 AuthContext: Logging out user");

    // Clear storage
    AuthStorage.clearAuthData();

    // Update state
    setUser(null);

    // Redirect to home
    router.push("/");
  };

  const updateUser = (userData: StoredUser) => {
    console.log("🔐 AuthContext: Updating user data");

    // Update storage
    AuthStorage.setUser(userData);

    // Update state
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && AuthStorage.isAuthenticated(),
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthContext;
