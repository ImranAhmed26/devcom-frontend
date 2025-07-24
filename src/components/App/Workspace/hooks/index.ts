import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceApi } from "../api";
import type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest } from "../types";

// Query Keys - centralized for better cache management
export const workspaceKeys = {
  all: ["workspaces"] as const,
  lists: () => [...workspaceKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...workspaceKeys.lists(), { filters }] as const,
  details: () => [...workspaceKeys.all, "detail"] as const,
  detail: (id: string) => [...workspaceKeys.details(), id] as const,
};

// Hook to fetch all workspaces
export function useWorkspaces() {
  return useQuery({
    queryKey: workspaceKeys.lists(),
    queryFn: async () => {
      console.log("🪝 [useWorkspaces] Fetching workspaces...");
      const response = await workspaceApi.getWorkspaces();
      console.log("🪝 [useWorkspaces] Fetched", response.data.length, "workspaces");
      return response.data;
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
      console.log("🪝 [useCreateWorkspace] Success, invalidating queries");

      // Add the new workspace to the cache optimistically
      queryClient.setQueryData<Workspace[]>(workspaceKeys.lists(), (old) => {
        if (!old) return [newWorkspace];
        return [newWorkspace, ...old];
      });

      // Invalidate and refetch workspaces list
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
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

      // Remove the workspace from the list cache optimistically
      queryClient.setQueryData<Workspace[]>(workspaceKeys.lists(), (old) => {
        if (!old) return [];
        return old.filter((ws) => ws.id !== deletedId);
      });

      // Remove the individual workspace cache
      queryClient.removeQueries({ queryKey: workspaceKeys.detail(deletedId) });

      // Invalidate the list to ensure consistency
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
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
