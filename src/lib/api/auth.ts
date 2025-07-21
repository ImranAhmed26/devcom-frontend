import api from "./api";
import type { ApiResponse } from "./api";
import AuthStorage from "@/lib/auth/storage";

// Authentication Types
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  companyName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  role: "user" | "admin";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

// Authentication API Functions
export const authApi = {
  // Register new user
  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    console.log(" RES", response);
    console.log("Data ", data);

    // Note: Token storage is now handled by the auth context
    // The forms will handle storing tokens and user data

    return response;
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    console.log("🌟 authApi.login: Called with data:", data);

    try {
      console.log("🌟 authApi.login: Making API call to /auth/login");
      const response = await api.post<AuthResponse>("/auth/login", data);
      console.log("🌟 authApi.login: API response:", response);

      // Note: Token storage is now handled by the auth context
      // The forms will handle storing tokens and user data

      return response;
    } catch (error) {
      console.error("🌟 authApi.login: API call failed:", error);
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.post<{ message: string }>("/auth/logout");
      return response;
    } finally {
      // Always clear tokens, even if logout request fails
      AuthStorage.clearAuthData();
    }
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    return api.get<User>("/auth/profile");
  },

  // Refresh access token
  refreshToken: async (): Promise<ApiResponse<RefreshTokenResponse>> => {
    const refreshToken = AuthStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken,
    });

    // Update stored tokens
    if (response.success) {
      AuthStorage.setAccessToken(response.data.token);
      AuthStorage.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>("/auth/verify-email", { token });
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>("/auth/forgot-password", { email });
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>("/auth/reset-password", {
      token,
      password,
    });
  },
};

export default authApi;
