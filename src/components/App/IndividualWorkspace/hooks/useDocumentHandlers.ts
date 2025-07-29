import { useWorkspaceStore } from "../store/workspaceStore";
import { useDeleteDocument, useReprocessDocument } from "./index";

/**
 * Custom hook that provides all document-related handlers
 * Centralizes document operations and reduces component complexity
 */
export function useDocumentHandlers() {
  const documents = useWorkspaceStore((state) => state.documents);
  const selectedDocuments = useWorkspaceStore((state) => state.ui.selectedDocuments);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);
  const toggleDocumentSelection = useWorkspaceStore((state) => state.toggleDocumentSelection);
  const selectAllDocuments = useWorkspaceStore((state) => state.selectAllDocuments);
  const clearSelection = useWorkspaceStore((state) => state.clearSelection);

  const deleteDocumentMutation = useDeleteDocument();
  const reprocessDocumentMutation = useReprocessDocument();

  // Handle document selection
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDocumentSelect = (_document: any) => {
    // TODO: Open document viewer
  };

  // Handle document deletion with confirmation
  const handleDocumentDelete = async (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId);
    if (!document) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${document.originalName}"?\n\nThis action cannot be undone.`
    );

    if (confirmed) {
      try {
        await deleteDocumentMutation.mutateAsync(documentId);
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    }
  };

  // Handle document reprocessing
  const handleDocumentReprocess = async (documentId: string) => {
    try {
      await reprocessDocumentMutation.mutateAsync(documentId);
    } catch (error) {
      console.error("Failed to reprocess document:", error);
    }
  };

  // Handle document download
  const handleDocumentDownload = (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId);
    if (document?.downloadUrl) {
      window.open(document.downloadUrl, "_blank");
    }
  };

  // Handle upload completion
  const handleUploadComplete = () => {
    // Switch to documents tab after successful upload
    setActiveTab("documents");
  };

  // Handle individual document selection toggle
  const handleDocumentToggle = (documentId: string) => {
    toggleDocumentSelection(documentId);
  };

  // Handle select all toggle
  const handleSelectAll = () => {
    const allSelected = documents.length > 0 && selectedDocuments.length === documents.length;
    if (allSelected) {
      clearSelection();
    } else {
      selectAllDocuments();
    }
  };

  // Handle bulk delete operation
  const handleBulkDelete = async () => {
    if (selectedDocuments.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedDocuments.length} selected document(s)?\n\nThis action cannot be undone.`
    );

    if (confirmed) {
      try {
        // Delete documents one by one
        for (const documentId of selectedDocuments) {
          await deleteDocumentMutation.mutateAsync(documentId);
        }
        // Clear selection after successful bulk delete
        clearSelection();
      } catch (error) {
        console.error("Failed to delete documents:", error);
        // Keep selection intact for retry
      }
    }
  };

  // Handle bulk reprocess operation
  const handleBulkReprocess = async () => {
    if (selectedDocuments.length === 0) return;

    const confirmed = window.confirm(`Are you sure you want to reprocess ${selectedDocuments.length} selected document(s)?`);

    if (confirmed) {
      try {
        // Reprocess documents one by one
        for (const documentId of selectedDocuments) {
          await reprocessDocumentMutation.mutateAsync(documentId);
        }
        // Clear selection after successful bulk reprocess
        clearSelection();
      } catch (error) {
        console.error("Failed to reprocess documents:", error);
        // Keep selection intact for retry
      }
    }
  };

  return {
    handleDocumentSelect,
    handleDocumentDelete,
    handleDocumentReprocess,
    handleDocumentDownload,
    handleUploadComplete,
    handleDocumentToggle,
    handleSelectAll,
    handleBulkDelete,
    handleBulkReprocess,
  };
}
