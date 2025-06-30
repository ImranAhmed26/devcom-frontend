import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// API Configuration Types
interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// API Response Types
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Error Types
interface ApiError {
  code: string;
  message: string;
  status: number;
}

// Base API Class
class Api {
  private instance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // You can add auth token here
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(this.handleError(error))
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.handleError(error))
    );
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      return {
        code: error.code || 'ERROR',
        message:
          (error.response.data as { message?: string })?.message ||
          error.message,
        status: error.response.status,
      };
    }
    return {
      code: 'NETWORK_ERROR',
      message: 'Network Error',
      status: 500,
    };
  }

  // Generic GET request
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Generic POST request
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Generic PUT request
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Generic DELETE request
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Generic PATCH request
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  // Query params helper
  buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });
    return searchParams.toString();
  }
}

// Create API instance
const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

export default api;

// Example usage with TanStack Query:
/*
import { useQuery, useMutation } from '@tanstack/react-query';

// Query hook example
export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/users'),
  });
};

// Mutation hook example
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (newUser: CreateUserDto) => api.post<User>('/users', newUser),
  });
};

// Parameterized query example
export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => api.get<User>(`/users/${id}`),
    enabled: !!id,
  });
};

// Query with params example
export const useSearchUsers = (params: UserSearchParams) => {
  return useQuery({
    queryKey: ['users', 'search', params],
    queryFn: () => api.get<User[]>(`/users/search?${api.buildQueryParams(params)}`),
  });
};
*/
