import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usersApi, { type User } from "@/lib/api/users";

// Query Keys
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Custom hook to fetch all users
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await usersApi.getUsers();
      return response.data; // Extract the users array from the API response
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Custom hook to fetch a single user by ID
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await usersApi.getUserById(id);
      return response.data;
    },
    enabled: !!id, // Only fetch if ID is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Custom hook to create a user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Omit<User, "id" | "createdAt" | "documents" | "jobs">) => usersApi.createUser(userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      console.log("✅ User created successfully");
    },
    onError: (error: any) => {
      console.error("❌ Failed to create user:", error);
    },
  });
}

// Custom hook to update a user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<User> }) => usersApi.updateUser(id, userData),
    onSuccess: (response, { id }) => {
      // Invalidate and refetch users list and specific user
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      console.log("✅ User updated successfully");
    },
    onError: (error: any) => {
      console.error("❌ Failed to update user:", error);
    },
  });
}

// Custom hook to delete a user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      console.log("✅ User deleted successfully");
    },
    onError: (error: any) => {
      console.error("❌ Failed to delete user:", error);
    },
  });
}
