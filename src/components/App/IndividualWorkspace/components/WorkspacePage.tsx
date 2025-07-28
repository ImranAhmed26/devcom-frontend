"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useWorkspaceStore } from "../store/workspaceStore";
import { useWorkspaceDetails, useWorkspaceDocuments, useDeleteDocument, useReprocessDocument } from "../hooks";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { TabNavigation } from "./TabNavigation";
import { UploadZone } from "./UploadZone";
import { DocumentList } from "./DocumentList";
import type { WorkspacePageProps } from "../types";

export function WorkspacePage({ workspaceId }: WorkspacePageProps) {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const documents = useWorkspaceStore((state) => state.documents);
  const filters = useWorkspaceStore((state) => state.filters);
  const search = useWorkspaceStore((state) => state.search);
  const sort = useWorkspaceStore((state) => state.sort);
  const ui = useWorkspaceStore((state) => state.ui);
  const setShowSettings = useWorkspaceStore((state) => state.setShowSettings);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);
  const reset = useWorkspaceStore((state) => state.reset);

  // Fetch workspace details
  const { isLoading: isLoadingWorkspace, error: workspaceError } = useWorkspaceDetails(workspaceId);

  // Fetch documents
  const { isLoading: isLoadingDocuments } = useWorkspaceDocuments({
    workspaceId,
    page: 1,
    limit: 50, // For now, load first 50 documents
    filters,
    search,
    sort,
  });

  // Mutations
  const deleteDocumentMutation = useDeleteDocument();
  const reprocessDocumentMutation = useReprocessDocument();

  // Reset store when component unmounts or workspace changes
  useEffect(() => {
    return () => {
      reset();
    };
  }, [workspaceId, reset]);

  // Handle document selection
  const handleDocumentSelect = (document: any) => {
    // TODO: Open document viewer
    onDocumentSelect(document);
  };

  // Handle document deletion
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
    if (document) {
      window.open(document.downloadUrl, "_blank");
    }
  };

  // Handle workspace settings
  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  // Handle export all
  const handleExportAllClick = () => {
    // TODO: Implement export all functionality
    onExportAllClick?.();
  };

  // Handle upload complete
  const handleUploadComplete = () => {
    // Switch to documents tab after successful upload
    setActiveTab("documents");
  };

  // Handle tab change
  const handleTabChange = (tab: "upload" | "documents") => {
    setActiveTab(tab);
  };

  // Loading state
  if (isLoadingWorkspace) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-6 space-y-6">
            {/* Tab navigation skeleton */}
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            {/* Tab content skeleton */}
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (workspaceError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Workspace Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The workspace you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link
            href="/workspace"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Workspaces
          </Link>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Workspace Header */}
      <WorkspaceHeader workspace={workspace} onSettingsClick={handleSettingsClick} onExportAllClick={handleExportAllClick} />

      {/* Main Content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Tab Navigation */}
        <TabNavigation activeTab={ui.activeTab} onTabChange={handleTabChange} documentCount={documents.length} />

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6">
          {ui.activeTab === "upload" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Upload Documents</h2>
                <p className="text-gray-600 dark:text-gray-400">Upload your documents for OCR processing and analysis</p>
              </div>
              <UploadZone workspaceId={workspaceId} onUploadComplete={handleUploadComplete} />
            </div>
          )}

          {ui.activeTab === "documents" && (
            <DocumentList
              documents={documents}
              onDocumentSelect={handleDocumentSelect}
              onDocumentDelete={handleDocumentDelete}
              onDocumentReprocess={handleDocumentReprocess}
              onDocumentDownload={handleDocumentDownload}
              isLoading={isLoadingDocuments}
            />
          )}
        </div>

        {/* TODO: Add more sections */}
        {/* - Document filters and search */}
        {/* - Processing queue */}
        {/* - Document viewer modal */}
        {/* - Settings modal */}
      </div>
    </div>
  );
}
