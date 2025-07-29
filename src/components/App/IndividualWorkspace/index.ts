// Main Individual Workspace feature exports

// Types
export type * from "./types";

// Store
export { useWorkspaceStore, useWorkspaceSelectors } from "./store/workspaceStore";

// API
export { individualWorkspaceApi } from "./api";

// Hooks
export {
  useWorkspaceDetails,
  useWorkspaceDocuments,
  useDocument,
  useOCRResults,
  useProcessingJobs,
  useUploadDocuments,
  useDeleteDocument,
  useUpdateWorkspace,
  useCancelJob,
  useRetryJob,
  useReprocessDocument,
  useExportDocuments,
  useUpdateOCRResults,
  individualWorkspaceKeys,
} from "./hooks";

// Components
export { WorkspacePage } from "./components/WorkspacePage";
export { WorkspaceHeader } from "./components/WorkspaceHeader";

export { DocumentTable } from "./components/DocumentTable";
export { UploadZone } from "./components/UploadZone";
export { TabNavigation } from "./components/TabNavigation";
export type { TabType } from "./components/TabNavigation";
// Future components to be implemented:
// - DocumentViewer: Modal for viewing document details and OCR results
// - ProcessingQueue: Component for monitoring document processing status

// Re-export the main component as default for convenience
export { WorkspacePage as default } from "./components/WorkspacePage";
