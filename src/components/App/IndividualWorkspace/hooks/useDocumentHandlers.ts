import { useWorkspaceStore } from "../store/workspaceStore";
import { useDeleteDocument, useReprocessDocument } from "./index";

/**
 * Custom hook that provides all document-related handlers
 * Centralizes document operations and reduces component complexity
 */
export function useDocumentHandlers() {
  const documents = useWorkspaceStore((state) => state.documents);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);

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

  return {
    handleDocumentSelect,
    handleDocumentDelete,
    handleDocumentReprocess,
    handleDocumentDownload,
    handleUploadComplete,
  };
}
