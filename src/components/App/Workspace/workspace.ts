// Main workspace feature exports

// Types
export type {
  Workspace,
  WorkspaceType,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  WorkspaceFilters,
  WorkspaceState,
} from "./types";

// API
export { workspaceApi } from "./api";

// Hooks
export {
  useWorkspaces,
  useRecentWorkspaces,
  useWorkspace,
  useCreateWorkspace,
  useUpdateWorkspace,
  useDeleteWorkspace,
  workspaceKeys,
} from "./hooks";

// UI Components
export { WorkspaceList } from "./ui/WorkspaceList";
export { WorkspaceCard } from "./ui/WorkspaceCard";
export { CreateWorkspaceForm } from "./ui/CreateWorkspaceForm";

// Re-export the main component as default for convenience
export { WorkspaceList as default } from "./ui/WorkspaceList";
