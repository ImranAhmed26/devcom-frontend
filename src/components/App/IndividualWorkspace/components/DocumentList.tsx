"use client";

import { useWorkspaceStore } from "../store/workspaceStore";
import { DocumentTable } from "./DocumentTable";
import type { Document } from "../types";

interface DocumentListProps {
  documents: Document[];
  onDocumentSelect: (document: Document) => void;
  onDocumentDelete: (documentId: string) => void;
  onDocumentReprocess: (documentId: string) => void;
  onDocumentDownload: (documentId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function DocumentList({
  documents,
  onDocumentSelect,
  onDocumentDelete,
  onDocumentReprocess,
  onDocumentDownload,
  isLoading,
  className = "",
}: DocumentListProps) {
  const selectedDocuments = useWorkspaceStore((state) => state.ui.selectedDocuments);
  const setSelectedDocument = useWorkspaceStore((state) => state.setSelectedDocument);
  const setSelectedDocuments = useWorkspaceStore((state) => state.setSelectedDocuments);

  // Handle document selection
  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    onDocumentSelect(document);
  };

  // Handle selection change
  const handleSelectionChange = (documentIds: string[]) => {
    setSelectedDocuments(documentIds);
  };

  return (
    <DocumentTable
      documents={documents}
      selectedDocuments={selectedDocuments}
      onDocumentSelect={handleDocumentSelect}
      onSelectionChange={handleSelectionChange}
      onDocumentDelete={onDocumentDelete}
      onDocumentReprocess={onDocumentReprocess}
      onDocumentDownload={onDocumentDownload}
      isLoading={isLoading}
      className={className}
    />
  );
}
