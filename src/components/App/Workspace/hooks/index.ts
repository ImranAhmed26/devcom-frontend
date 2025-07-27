import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceApi } from "../api";
import type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest, PaginationParams } from "../types";

// Query Keys - centralized for better cache management
export const workspaceKeys = {
  all: ["workspaces"] as const,
  lists: () => [...workspaceKeys.all, "list"] as const,
  list: (params: PaginationParams) => [...workspaceKeys.lists(), params] as const,
  recent: () => [...workspaceKeys.all, "recent"] as const,
  details: () => [...workspaceKeys.all, "detail"] as const,
  detail: (id: string) => [...workspaceKeys.details(), id] as const,
};

// Hook to fetch recent workspaces (6 most recently used)
export function useRecentWorkspaces() {
  return useQuery({
    queryKey: workspaceKeys.recent(),
    queryFn: async () => {
      console.log("🪝 [useRecentWorkspaces] Fetching recent workspaces...");
      const response = await workspaceApi.getRecentWorkspaces();
      console.log("🪝 [useRecentWorkspaces] API response:", response);

      // The API already returns the 6 most recently used workspaces, properly sorted
      const workspaces = response.data;
      console.log("🪝 [useRecentWorkspaces] Recent workspaces:", workspaces);
      return workspaces;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes (shorter than regular workspaces)
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        console.warn("🪝 [useRecentWorkspaces] Auth error, not retrying");
        return false;
      }
      // Don't retry on 4xx errors
      if (error?.status >= 400 && error?.status < 500) {
        console.warn("🪝 [useRecentWorkspaces] Client error, not retrying");
        return false;
      }
      console.log("🪝 [useRecentWorkspaces] Retrying...", failureCount);
      return failureCount < 3;
    },
    meta: {
      errorMessage: "Failed to load recent workspaces",
    },
  });
}

// Hook to fetch workspaces with pagination
export function useWorkspaces(params: PaginationParams = { page: 1, limit: 10 }) {
  return useQuery({
    queryKey: workspaceKeys.list(params),
    queryFn: async () => {
      console.log("🪝 [useWorkspaces] Fetching workspaces with params:", params);
      const response = await workspaceApi.getWorkspaces(params);
      console.log("🪝 [useWorkspaces] API response:", response);
      console.log("🪝 [useWorkspaces] Response data:", response.data);

      // The response now has pagination structure
      const paginatedData = response.data;
      console.log("🪝 [useWorkspaces] Paginated data:", paginatedData);
      console.log("🪝 [useWorkspaces] Workspaces array:", paginatedData.data);

      return paginatedData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        console.warn("🪝 [useWorkspaces] Auth error, not retrying");
        return false;
      }
      // Don't retry on 4xx errors
      if (error?.status >= 400 && error?.status < 500) {
        console.warn("🪝 [useWorkspaces] Client error, not retrying");
        return false;
      }
      console.log("🪝 [useWorkspaces] Retrying...", failureCount);
      return failureCount < 3;
    },
    meta: {
      errorMessage: "Failed to load workspaces",
    },
  });
}

// Hook to fetch a single workspace by ID
export function useWorkspace(id: string) {
  return useQuery({
    queryKey: workspaceKeys.detail(id),
    queryFn: async () => {
      console.log(`🪝 [useWorkspace] Fetching workspace ${id}...`);
      const response = await workspaceApi.getWorkspaceById(id);
      console.log(`🪝 [useWorkspace] Fetched workspace:`, response.data.name);
      return response.data;
    },
    enabled: !!id, // Only fetch if ID is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      errorMessage: `Failed to load workspace`,
    },
  });
}

// Hook to create a workspace
export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateWorkspaceRequest) => {
      console.log("🪝 [useCreateWorkspace] Creating workspace:", data.name);
      const response = await workspaceApi.createWorkspace(data);
      console.log("🪝 [useCreateWorkspace] Created workspace:", response.data.name);
      return response.data;
    },
    onSuccess: (newWorkspace) => {
      console.log("🪝 [useCreateWorkspace] Success, invalidating queries", newWorkspace);

      // Invalidate all workspace list queries (all pages)
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
      // Also invalidate recent workspaces
      queryClient.invalidateQueries({ queryKey: workspaceKeys.recent() });
    },
    onError: (error: any) => {
      console.error("🪝 [useCreateWorkspace] Error:", error?.message || error);
    },
    meta: {
      successMessage: "Workspace created successfully!",
      errorMessage: "Failed to create workspace",
    },
  });
}

// Hook to update a workspace
export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateWorkspaceRequest }) => {
      console.log(`🪝 [useUpdateWorkspace] Updating workspace ${id}:`, data);
      const response = await workspaceApi.updateWorkspace(id, data);
      console.log(`🪝 [useUpdateWorkspace] Updated workspace:`, response.data.name);
      return { id, workspace: response.data };
    },
    onSuccess: ({ id, workspace }) => {
      console.log("🪝 [useUpdateWorkspace] Success, updating cache");

      // Update the workspace in the list cache
      queryClient.setQueryData<Workspace[]>(workspaceKeys.lists(), (old) => {
        if (!old) return [workspace];
        return old.map((ws) => (ws.id === id ? workspace : ws));
      });

      // Update the individual workspace cache
      queryClient.setQueryData(workspaceKeys.detail(id), workspace);

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.recent() });
    },
    onError: (error: any) => {
      console.error("🪝 [useUpdateWorkspace] Error:", error?.message || error);
    },
    meta: {
      successMessage: "Workspace updated successfully!",
      errorMessage: "Failed to update workspace",
    },
  });
}

// Hook to delete a workspace
export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log(`🪝 [useDeleteWorkspace] Deleting workspace ${id}`);
      await workspaceApi.deleteWorkspace(id);
      console.log(`🪝 [useDeleteWorkspace] Deleted workspace ${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      console.log("🪝 [useDeleteWorkspace] Success, updating cache");

      // Remove the individual workspace cache
      queryClient.removeQueries({ queryKey: workspaceKeys.detail(deletedId) });

      // Invalidate all workspace list queries (all pages)
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
      // Also invalidate recent workspaces
      queryClient.invalidateQueries({ queryKey: workspaceKeys.recent() });
    },
    onError: (error: any) => {
      console.error("🪝 [useDeleteWorkspace] Error:", error?.message || error);
    },
    meta: {
      successMessage: "Workspace deleted successfully!",
      errorMessage: "Failed to delete workspace",
    },
  });
}
