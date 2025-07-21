// Simple authentication storage utilities
// SSR-safe localStorage wrapper

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: string;
  companyName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthStorage {
  private static readonly ACCESS_TOKEN_KEY = "auth_access_token";
  private static readonly REFRESH_TOKEN_KEY = "auth_refresh_token";
  private static readonly USER_KEY = "auth_user";

  // Check if we're in browser environment
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  // Token management
  static getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }
  }

  static getRefreshToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
  }

  // User data management
  static getUser(): StoredUser | null {
    if (!this.isBrowser()) return null;

    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  }

  static setUser(user: StoredUser): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  // Set all auth data at once (for login/register)
  static setAuthData(tokens: AuthTokens, user: StoredUser): void {
    this.setAccessToken(tokens.accessToken);
    this.setRefreshToken(tokens.refreshToken);
    this.setUser(user);
  }

  // Clear all auth data (for logout)
  static clearAuthData(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  // Check if user is authenticated (has valid token)
  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Get all auth data
  static getAuthData(): { tokens: AuthTokens | null; user: StoredUser | null } {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const user = this.getUser();

    const tokens = accessToken && refreshToken ? { accessToken, refreshToken } : null;

    return { tokens, user };
  }
}

export default AuthStorage;
