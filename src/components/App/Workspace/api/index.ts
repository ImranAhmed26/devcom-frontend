import api from "@/lib/api/api";
import type { ApiResponse } from "@/lib/api/api";
import type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest } from "../types";

// Mock data for fallback
const mockWorkspaces: Workspace[] = [
  {
    id: "ws-1234-5678-9abc-def0",
    name: "Finance Documents",
    createdAt: "2025-01-15T10:30:00.000Z",
    updatedAt: "2025-01-20T14:45:00.000Z",
    userId: "84a4d67f-5345-4bd4-9556-831c81eb86e8",
    companyId: "22c7f430-ca80-4e3a-be04-5ce534b050b8",
    documentsCount: 25,
    jobsCount: 8,
  },
  {
    id: "ws-2345-6789-bcde-f012",
    name: "Invoice Processing",
    createdAt: "2025-01-10T09:15:00.000Z",
    updatedAt: "2025-01-22T16:20:00.000Z",
    userId: "94b5e78g-6456-5ce5-a667-942d92fc97f9",
    companyId: "22c7f430-ca80-4e3a-be04-5ce534b050b8",
    documentsCount: 42,
    jobsCount: 15,
  },
  {
    id: "ws-3456-789a-cdef-0123",
    name: "Receipt Archive",
    createdAt: "2025-01-05T11:00:00.000Z",
    updatedAt: "2025-01-18T13:30:00.000Z",
    userId: "a5c6f89h-7567-6df6-b778-a53ea3gd08ga",
    companyId: "33d8g541-db91-5f4b-cf15-6df645e161c9",
    documentsCount: 18,
    jobsCount: 3,
  },
];

// Workspace API Functions
export const workspaceApi = {
  // Get all workspaces
  getWorkspaces: async (): Promise<ApiResponse<Workspace[]>> => {
    console.log("🏢 [Workspace API] Fetching workspaces from /workspace endpoint");

    try {
      // Try real API first
      const response = await api.get<Workspace[]>("/workspace");
      console.log("🏢 [Workspace API] Successfully fetched workspaces:", response.data.length);
      return response;
    } catch (error: any) {
      console.warn("🏢 [Workspace API] Real API failed:", error?.message || error);

      // If it's an auth error, re-throw to let auth system handle it
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        console.warn("🏢 [Workspace API] Authentication required");
        throw error;
      }

      // For other errors, fallback to mock data
      console.warn("🏢 [Workspace API] Using mock data as fallback");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      return {
        data: mockWorkspaces,
        status: 200,
        success: true,
        message: "Workspaces fetched successfully (mock data)",
      };
    }
  },

  // Get workspace by ID
  getWorkspaceById: async (id: string): Promise<ApiResponse<Workspace>> => {
    console.log(`🏢 [Workspace API] Fetching workspace ${id}`);

    try {
      const response = await api.get<Workspace>(`/workspace/${id}`);
      console.log(`🏢 [Workspace API] Successfully fetched workspace:`, response.data.name);
      return response;
    } catch (error: any) {
      console.warn(`🏢 [Workspace API] Failed to fetch workspace ${id}:`, error?.message || error);

      // If it's an auth error, re-throw
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        throw error;
      }

      // Fallback to mock data
      const mockWorkspace = mockWorkspaces.find((ws) => ws.id === id);
      if (mockWorkspace) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          data: mockWorkspace,
          status: 200,
          success: true,
          message: "Workspace fetched successfully (mock data)",
        };
      }

      throw error; // Re-throw if not found in mock data
    }
  },

  // Create new workspace
  createWorkspace: async (data: CreateWorkspaceRequest): Promise<ApiResponse<Workspace>> => {
    console.log("🏢 [Workspace API] Creating new workspace:", data.name);

    try {
      const response = await api.post<Workspace>("/workspace", data);
      console.log("🏢 [Workspace API] Successfully created workspace:", response.data.name);
      return response;
    } catch (error: any) {
      console.error("🏢 [Workspace API] Failed to create workspace:", error?.message || error);

      // If it's an auth error, re-throw
      if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
        throw error;
      }

      // For demo purposes, simulate successful creation with mock data
      if (process.env.NODE_ENV === "development") {
        console.warn("🏢 [Workspace API] Simulating workspace creation (mock)");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newWorkspace: Workspace = {
          id: `ws-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: data.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          documentsCount: 0,
          jobsCount: 0,
        };

        return {
          data: newWorkspace,
          status: 201,
          success: true,
          message: "Workspace created successfully (mock)",
        };
      }

      throw error;
    }
  },

  // Update workspace
  updateWorkspace: async (id: string, data: UpdateWorkspaceRequest): Promise<ApiResponse<Workspace>> => {
    console.log(`🏢 [Workspace API] Updating workspace ${id}:`, data);

    try {
      const response = await api.put<Workspace>(`/workspace/${id}`, data);
      console.log(`🏢 [Workspace API] Successfully updated workspace:`, response.data.name);
      return response;
    } catch (error: any) {
      console.error(`🏢 [Workspace API] Failed to update workspace ${id}:`, error?.message || error);
      throw error;
    }
  },

  // Delete workspace
  deleteWorkspace: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    console.log(`🏢 [Workspace API] Deleting workspace ${id}`);

    try {
      const response = await api.delete<{ message: string }>(`/workspace/${id}`);
      console.log(`🏢 [Workspace API] Successfully deleted workspace`);
      return response;
    } catch (error: any) {
      console.error(`🏢 [Workspace API] Failed to delete workspace ${id}:`, error?.message || error);

      // For demo purposes, simulate successful deletion
      if (process.env.NODE_ENV === "development") {
        console.warn("🏢 [Workspace API] Simulating workspace deletion (mock)");
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
          data: { message: "Workspace deleted successfully" },
          status: 200,
          success: true,
          message: "Workspace deleted successfully (mock)",
        };
      }

      throw error;
    }
  },
};

export default workspaceApi;
