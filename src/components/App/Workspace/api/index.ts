import api from "@/lib/api/api";
import type { ApiResponse } from "@/lib/api/api";
import type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest } from "../types";

// Workspace API Functions
export const workspaceApi = {
  // Get all workspaces
  getWorkspaces: async (): Promise<ApiResponse<Workspace[]>> => {
    console.log("🏢 [Workspace API] Fetching workspaces from /workspace endpoint");
    return await api.get<Workspace[]>("/workspace");
  },

  // Get workspace by ID
  getWorkspaceById: async (id: string): Promise<ApiResponse<Workspace>> => {
    console.log(`🏢 [Workspace API] Fetching workspace ${id}`);
    return await api.get<Workspace>(`/workspace/${id}`);
  },

  // Create new workspace
  createWorkspace: async (data: CreateWorkspaceRequest): Promise<ApiResponse<Workspace>> => {
    console.log("🏢 [Workspace API] Creating new workspace:", data.name);
    return await api.post<Workspace>("/workspace", data);
  },

  // Update workspace
  updateWorkspace: async (id: string, data: UpdateWorkspaceRequest): Promise<ApiResponse<Workspace>> => {
    console.log(`🏢 [Workspace API] Updating workspace ${id}:`, data);
    return await api.put<Workspace>(`/workspace/${id}`, data);
  },

  // Delete workspace
  deleteWorkspace: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    console.log(`🏢 [Workspace API] Deleting workspace ${id}`);
    return await api.delete<{ message: string }>(`/workspace/${id}`);
  },
};

export default workspaceApi;
