// Workspace Types
export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  companyId?: string;
  documentsCount?: number;
  jobsCount?: number;
}

export interface CreateWorkspaceRequest {
  name: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
}

export interface WorkspaceFilters {
  search?: string;
  sortBy?: "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface WorkspaceState {
  selectedWorkspace: Workspace | null;
  filters: WorkspaceFilters;
  isCreating: boolean;
}

// Re-export for convenience
export type { Workspace as WorkspaceType };
