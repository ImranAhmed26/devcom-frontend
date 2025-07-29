import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  Workspace,
  Document,
  ProcessingJob,
  UploadItem,
  DocumentFilters,
  DocumentSearch,
  DocumentSort,
  WorkspaceUIState,
} from "../types";

interface WorkspaceStore {
  // Core Data
  workspace: Workspace | null;
  documents: Document[];
  processingJobs: ProcessingJob[];
  uploadQueue: UploadItem[];

  // UI State
  ui: WorkspaceUIState;

  // Filters and Search
  filters: DocumentFilters;
  search: DocumentSearch;
  sort: DocumentSort;

  // Loading States
  loading: {
    workspace: boolean;
    documents: boolean;
    upload: boolean;
    processing: boolean;
  };

  // Error States
  errors: {
    workspace: string | null;
    documents: string | null;
    upload: string | null;
    processing: string | null;
  };

  // Actions
  setWorkspace: (workspace: Workspace | null) => void;
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (documentId: string, updates: Partial<Document>) => void;
  removeDocument: (documentId: string) => void;

  setProcessingJobs: (jobs: ProcessingJob[]) => void;
  addProcessingJob: (job: ProcessingJob) => void;
  updateProcessingJob: (jobId: string, updates: Partial<ProcessingJob>) => void;
  removeProcessingJob: (jobId: string) => void;

  setUploadQueue: (items: UploadItem[]) => void;
  addUploadItem: (item: UploadItem) => void;
  updateUploadItem: (itemId: string, updates: Partial<UploadItem>) => void;
  removeUploadItem: (itemId: string) => void;
  clearUploadQueue: () => void;

  // UI Actions
  setSelectedDocument: (document: Document | null) => void;
  setSelectedDocuments: (documentIds: string[]) => void;
  toggleDocumentSelection: (documentId: string) => void;
  selectAllDocuments: () => void;
  clearSelection: () => void;

  setShowUploadZone: (show: boolean) => void;
  setShowProcessingQueue: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveTab: (tab: "upload" | "documents") => void;

  // Filter and Search Actions
  setFilters: (filters: DocumentFilters) => void;
  setSearch: (search: DocumentSearch) => void;
  setSort: (sort: DocumentSort) => void;

  // Loading Actions
  setLoading: (key: keyof WorkspaceStore["loading"], loading: boolean) => void;

  // Error Actions
  setError: (key: keyof WorkspaceStore["errors"], error: string | null) => void;
  clearErrors: () => void;

  // Reset Actions
  reset: () => void;
}

const initialState = {
  workspace: null,
  documents: [],
  processingJobs: [],
  uploadQueue: [],

  ui: {
    selectedDocument: null,
    selectedDocuments: [],
    showUploadZone: false,
    showProcessingQueue: false,
    showSettings: false,
    sidebarCollapsed: false,
    activeTab: "documents" as const,
  },

  filters: {},
  search: {
    query: "",
    searchIn: ["filename", "content"] as ("filename" | "content" | "metadata")[],
  },
  sort: {
    field: "uploaded" as const,
    direction: "desc" as const,
  },

  loading: {
    workspace: false,
    documents: false,
    upload: false,
    processing: false,
  },

  errors: {
    workspace: null,
    documents: null,
    upload: null,
    processing: null,
  },
};

export const useWorkspaceStore = create<WorkspaceStore>()(
  devtools(
    (set) => ({
      ...initialState,

      // Core Data Actions
      setWorkspace: (workspace) => set({ workspace }),

      setDocuments: (documents) => set({ documents }),

      addDocument: (document) =>
        set((state) => ({
          documents: [document, ...state.documents],
        })),

      updateDocument: (documentId, updates) =>
        set((state) => ({
          documents: state.documents.map((doc) => (doc.id === documentId ? { ...doc, ...updates } : doc)),
        })),

      removeDocument: (documentId) =>
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== documentId),
          ui: {
            ...state.ui,
            selectedDocument: state.ui.selectedDocument?.id === documentId ? null : state.ui.selectedDocument,
            selectedDocuments: state.ui.selectedDocuments.filter((id) => id !== documentId),
          },
        })),

      // Processing Jobs Actions
      setProcessingJobs: (processingJobs) => set({ processingJobs }),

      addProcessingJob: (job) =>
        set((state) => ({
          processingJobs: [job, ...state.processingJobs],
        })),

      updateProcessingJob: (jobId, updates) =>
        set((state) => ({
          processingJobs: state.processingJobs.map((job) => (job.id === jobId ? { ...job, ...updates } : job)),
        })),

      removeProcessingJob: (jobId) =>
        set((state) => ({
          processingJobs: state.processingJobs.filter((job) => job.id !== jobId),
        })),

      // Upload Queue Actions
      setUploadQueue: (uploadQueue) => set({ uploadQueue }),

      addUploadItem: (item) =>
        set((state) => ({
          uploadQueue: [...state.uploadQueue, item],
        })),

      updateUploadItem: (itemId, updates) =>
        set((state) => ({
          uploadQueue: state.uploadQueue.map((item) => (item.id === itemId ? { ...item, ...updates } : item)),
        })),

      removeUploadItem: (itemId) =>
        set((state) => ({
          uploadQueue: state.uploadQueue.filter((item) => item.id !== itemId),
        })),

      clearUploadQueue: () => set({ uploadQueue: [] }),

      // UI Actions
      setSelectedDocument: (selectedDocument) =>
        set((state) => ({
          ui: { ...state.ui, selectedDocument },
        })),

      setSelectedDocuments: (selectedDocuments) =>
        set((state) => ({
          ui: { ...state.ui, selectedDocuments },
        })),

      toggleDocumentSelection: (documentId) =>
        set((state) => {
          const isSelected = state.ui.selectedDocuments.includes(documentId);
          const selectedDocuments = isSelected
            ? state.ui.selectedDocuments.filter((id) => id !== documentId)
            : [...state.ui.selectedDocuments, documentId];

          return {
            ui: { ...state.ui, selectedDocuments },
          };
        }),

      selectAllDocuments: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            selectedDocuments: state.documents.map((doc) => doc.id),
          },
        })),

      clearSelection: () =>
        set((state) => ({
          ui: { ...state.ui, selectedDocuments: [], selectedDocument: null },
        })),

      setShowUploadZone: (showUploadZone) =>
        set((state) => ({
          ui: { ...state.ui, showUploadZone },
        })),

      setShowProcessingQueue: (showProcessingQueue) =>
        set((state) => ({
          ui: { ...state.ui, showProcessingQueue },
        })),

      setShowSettings: (showSettings) =>
        set((state) => ({
          ui: { ...state.ui, showSettings },
        })),

      setSidebarCollapsed: (sidebarCollapsed) =>
        set((state) => ({
          ui: { ...state.ui, sidebarCollapsed },
        })),

      setActiveTab: (activeTab) =>
        set((state) => ({
          ui: { ...state.ui, activeTab },
        })),

      // Filter and Search Actions
      setFilters: (filters) => set({ filters }),

      setSearch: (search) => set({ search }),

      setSort: (sort) => set({ sort }),

      // Loading Actions
      setLoading: (key, loading) =>
        set((state) => ({
          loading: { ...state.loading, [key]: loading },
        })),

      // Error Actions
      setError: (key, error) =>
        set((state) => ({
          errors: { ...state.errors, [key]: error },
        })),

      clearErrors: () =>
        set({
          errors: {
            workspace: null,
            documents: null,
            upload: null,
            processing: null,
          },
        }),

      // Reset Actions
      reset: () => set(initialState),
    }),
    {
      name: "workspace-store",
    }
  )
);

// Selectors for common derived state
export const useWorkspaceSelectors = () => {
  const store = useWorkspaceStore();

  return {
    // Filtered and sorted documents
    filteredDocuments: () => {
      let filtered = [...store.documents];

      // Apply filters
      if (store.filters.status?.length) {
        filtered = filtered.filter((doc) => store.filters.status!.includes(doc.status));
      }

      if (store.filters.fileTypes?.length) {
        filtered = filtered.filter((doc) => store.filters.fileTypes!.includes(doc.mimeType));
      }

      if (store.filters.dateRange) {
        const start = new Date(store.filters.dateRange.start);
        const end = new Date(store.filters.dateRange.end);
        filtered = filtered.filter((doc) => {
          const docDate = new Date(doc.uploadedAt);
          return docDate >= start && docDate <= end;
        });
      }

      if (store.filters.confidenceRange && store.filters.confidenceRange.min !== undefined) {
        filtered = filtered.filter((doc) => {
          if (!doc.ocrResults) return false;
          return (
            doc.ocrResults.confidence >= store.filters.confidenceRange!.min &&
            doc.ocrResults.confidence <= store.filters.confidenceRange!.max
          );
        });
      }

      // Apply search
      if (store.search.query) {
        const query = store.search.query.toLowerCase();
        filtered = filtered.filter((doc) => {
          if (store.search.searchIn.includes("filename") && doc.filename.toLowerCase().includes(query)) {
            return true;
          }
          if (store.search.searchIn.includes("content") && doc.ocrResults?.extractedText.toLowerCase().includes(query)) {
            return true;
          }
          return false;
        });
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (store.sort.field) {
          case "name":
            aValue = a.filename.toLowerCase();
            bValue = b.filename.toLowerCase();
            break;
          case "date":
          case "uploaded":
            aValue = new Date(a.uploadedAt);
            bValue = new Date(b.uploadedAt);
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          case "confidence":
            aValue = a.ocrResults?.confidence || 0;
            bValue = b.ocrResults?.confidence || 0;
            break;
          case "size":
            aValue = a.fileSize;
            bValue = b.fileSize;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return store.sort.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return store.sort.direction === "asc" ? 1 : -1;
        return 0;
      });

      return filtered;
    },

    // Active processing jobs
    activeJobs: () => store.processingJobs.filter((job) => job.status === "pending" || job.status === "running"),

    // Upload progress
    uploadProgress: () => {
      if (store.uploadQueue.length === 0) return null;
      const totalProgress = store.uploadQueue.reduce((sum, item) => sum + item.progress, 0);
      return totalProgress / store.uploadQueue.length;
    },

    // Has any loading state
    isLoading: () => Object.values(store.loading).some(Boolean),

    // Has any errors
    hasErrors: () => Object.values(store.errors).some(Boolean),

    // Document statistics for table display
    documentStats: () => {
      const documents = store.documents;
      return {
        total: documents.length,
        uploading: documents.filter((doc) => doc.status === "uploading").length,
        queued: documents.filter((doc) => doc.status === "queued").length,
        processing: documents.filter((doc) => doc.status === "processing").length,
        completed: documents.filter((doc) => doc.status === "completed").length,
        failed: documents.filter((doc) => doc.status === "failed").length,
        selected: store.ui.selectedDocuments.length,
      };
    },

    // Check if all documents are selected
    allDocumentsSelected: () => {
      const visibleDocuments = store.documents;
      return visibleDocuments.length > 0 && store.ui.selectedDocuments.length === visibleDocuments.length;
    },

    // Check if some documents are selected (for indeterminate state)
    someDocumentsSelected: () => {
      return store.ui.selectedDocuments.length > 0 && store.ui.selectedDocuments.length < store.documents.length;
    },

    // Get current tab content count
    tabCounts: () => ({
      upload: store.uploadQueue.length,
      documents: store.documents.length,
    }),
  };
};
