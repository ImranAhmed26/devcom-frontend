"use client";

import { Link } from "@/i18n/navigation";
import { useWorkspaceStore } from "../store/workspaceStore";
import { useWorkspaceDetails, useWorkspaceDocuments } from "../hooks";
import { useWorkspaceDataManagement } from "../hooks/useWorkspaceDataManagement";
import { useDocumentHandlers } from "../hooks/useDocumentHandlers";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { TabNavigation } from "./TabNavigation";
import { UploadZone } from "./UploadZone";
import { DocumentTable } from "./DocumentTable";
import type { WorkspacePageProps } from "../types";

export function WorkspacePage({ workspaceId }: WorkspacePageProps) {
  // Store state
  const workspace = useWorkspaceStore((state) => state.workspace);
  const documents = useWorkspaceStore((state) => state.documents);
  const filters = useWorkspaceStore((state) => state.filters);
  const search = useWorkspaceStore((state) => state.search);
  const sort = useWorkspaceStore((state) => state.sort);
  const ui = useWorkspaceStore((state) => state.ui);
  const setShowSettings = useWorkspaceStore((state) => state.setShowSettings);
  const setActiveTab = useWorkspaceStore((state) => state.setActiveTab);

  // Data fetching
  const { isLoading: isLoadingWorkspace, error: workspaceError } = useWorkspaceDetails(workspaceId);
  const { isLoading: isLoadingDocuments } = useWorkspaceDocuments({
    workspaceId,
    page: 1,
    limit: 50,
    filters,
    search,
    sort,
  });

  // Custom hooks for complex logic
  const { hasCachedData } = useWorkspaceDataManagement(workspaceId);
  const documentHandlers = useDocumentHandlers();

  // Selection state calculations
  const allSelected = documents.length > 0 && ui.selectedDocuments.length === documents.length;
  const someSelected = ui.selectedDocuments.length > 0 && ui.selectedDocuments.length < documents.length;

  // Workspace handlers
  const handleSettingsClick = () => setShowSettings(true);
  const handleExportAllClick = () => {
    // TODO: Implement export all functionality
  };
  const handleTabChange = (tab: "upload" | "documents") => setActiveTab(tab);

  // Loading state - only show if no workspace data and no cached data
  if (!workspace && !workspaceError && isLoadingWorkspace && !hasCachedData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
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
          <div className="p-6 space-y-6">
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
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
            The workspace you&apos;re looking for does not exist or you do not have access to it.
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

  // Fallback loading state
  if (!workspace && !isLoadingWorkspace) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Loading Workspace...</h1>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your workspace.</p>
        </div>
      </div>
    );
  }

  // Final safety check
  if (!workspace) {
    return null;
  }

  return (
    <div key={workspaceId} className="flex flex-col gap-3 min-h-screen bg-gray-5 dark:bg-gray-90">
      <WorkspaceHeader workspace={workspace} onSettingsClick={handleSettingsClick} onExportAllClick={handleExportAllClick} />

      <TabNavigation activeTab={ui.activeTab} onTabChange={handleTabChange} documentCount={documents.length} />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6">
        {ui.activeTab === "upload" && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Upload Documents</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload your documents for OCR processing and analysis</p>
            </div>
            <UploadZone workspaceId={workspaceId} onUploadComplete={documentHandlers.handleUploadComplete} />
          </div>
        )}

        {ui.activeTab === "documents" && (
          <DocumentTable
            documents={documents}
            selectedDocuments={ui.selectedDocuments}
            onDocumentSelect={documentHandlers.handleDocumentSelect}
            onDocumentToggle={documentHandlers.handleDocumentToggle}
            onSelectAll={documentHandlers.handleSelectAll}
            allSelected={allSelected}
            someSelected={someSelected}
            onDocumentDelete={documentHandlers.handleDocumentDelete}
            onDocumentReprocess={documentHandlers.handleDocumentReprocess}
            onDocumentDownload={documentHandlers.handleDocumentDownload}
            onBulkDelete={documentHandlers.handleBulkDelete}
            onBulkReprocess={documentHandlers.handleBulkReprocess}
            isLoading={isLoadingDocuments}
          />
        )}
      </div>
    </div>
  );
}
