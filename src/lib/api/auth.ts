import api, { TokenManager } from "./api";
import type { ApiResponse } from "./api";

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

    // Store tokens after successful registration
    if (response.success && response.data.token) {
      TokenManager.setToken(response.data.token);
      TokenManager.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>("/auth/login", data);

    // Store tokens after successful login
    if (response.success && response.data.token) {
      TokenManager.setToken(response.data.token);
      TokenManager.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  // Logout user
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.post<{ message: string }>("/auth/logout");
      return response;
    } finally {
      // Always clear tokens, even if logout request fails
      TokenManager.clearTokens();
    }
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    return api.get<User>("/auth/profile");
  },

  // Refresh access token
  refreshToken: async (): Promise<ApiResponse<RefreshTokenResponse>> => {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken,
    });

    // Update stored tokens
    if (response.success) {
      TokenManager.setToken(response.data.token);
      TokenManager.setRefreshToken(response.data.refreshToken);
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
