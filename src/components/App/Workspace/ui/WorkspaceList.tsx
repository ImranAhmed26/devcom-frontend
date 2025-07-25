"use client";

import { useState } from "react";
import { Layers, RefreshCw, FolderKanban, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useWorkspaces, useDeleteWorkspace } from "../hooks";
import { WorkspaceCard } from "./WorkspaceCard";
import { CreateWorkspaceForm } from "./CreateWorkspaceForm";
import { AppButton } from "@/components/Interface/Button/AppButton";
import type { Workspace } from "../types";

interface WorkspaceListProps {
  className?: string;
}

export function WorkspaceList({ className = "" }: WorkspaceListProps) {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: paginatedData,
    isLoading,
    error,
    isError,
    refetch,
  } = useWorkspaces({
    page: currentPage,
    limit: pageSize,
  });

  const deleteWorkspaceMutation = useDeleteWorkspace();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Extract workspaces array from paginated response
  const workspaces = paginatedData?.data || [];
  const totalWorkspaces = paginatedData?.total || 0;
  const totalPages = paginatedData?.totalPages || 0;

  // Debug logging
  console.log("🎨 [WorkspaceList] Component render:");
  console.log("🎨 [WorkspaceList] paginatedData:", paginatedData);
  console.log("🎨 [WorkspaceList] workspaces:", workspaces);
  console.log("🎨 [WorkspaceList] totalWorkspaces:", totalWorkspaces);
  console.log("🎨 [WorkspaceList] isLoading:", isLoading);
  console.log("🎨 [WorkspaceList] isError:", isError);
  console.log("🎨 [WorkspaceList] error:", error);

  const handleDeleteWorkspace = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone and will permanently remove all associated documents and jobs.`
    );

    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteWorkspaceMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete workspace:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = () => {
    console.log("🔄 [WorkspaceList] Refreshing workspaces...");
    refetch();
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    console.log("✅ [WorkspaceList] Workspace created, form closed");
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
    console.log("❌ [WorkspaceList] Workspace creation cancelled");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="rounded-medium border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-quadraGray rounded-t-medium flex justify-between">
            <h2 className="flex gap-2 items-center text-lg font-semibold dark:text-white">
              <Layers color={theme === "dark" ? "#a18eff" : "#4f46e5"} />
              Your Workspaces
            </h2>
          </div>
          <div className="p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading workspaces...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="rounded-medium border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-quadraGray rounded-t-medium flex justify-between">
            <h2 className="flex gap-2 items-center text-lg font-semibold dark:text-white">
              <Layers color={theme === "dark" ? "#a18eff" : "#4f46e5"} />
              Your Workspaces
            </h2>
            <AppButton onClick={handleRefresh} icon={<RefreshCw className="h-4 w-4" />}>
              Retry
            </AppButton>
          </div>
          <div className="p-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Error loading workspaces</h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {(error as any)?.message || "Failed to fetch workspaces. Please check your connection and try again."}
                  </p>
                  <button
                    onClick={handleRefresh}
                    className="mt-3 text-sm text-red-800 dark:text-red-400 underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="rounded-medium border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-quadraGray rounded-t-medium flex justify-between items-center">
          <h2 className="flex gap-2 items-center text-lg font-semibold dark:text-white">
            <Layers color={theme === "dark" ? "#a18eff" : "#4f46e5"} />
            Your Workspaces ({totalWorkspaces})
          </h2>
          <div className="flex gap-2">
            <AppButton onClick={handleRefresh} icon={<RefreshCw className="h-4 w-4" />}>
              Refresh
            </AppButton>
            <CreateWorkspaceForm
              onSuccess={handleCreateSuccess}
              onCancel={handleCreateCancel}
              trigger={
                <AppButton onClick={() => setShowCreateForm(true)} icon={<FolderKanban className="h-4 w-4" />}>
                  Add Workspace
                </AppButton>
              }
            />
          </div>
        </div>

        {/* Empty state */}
        {workspaces.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <FolderKanban className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No workspaces found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Get started by creating your first workspace to organize your documents and OCR jobs.
            </p>
            <CreateWorkspaceForm onSuccess={handleCreateSuccess} onCancel={handleCreateCancel} />
          </div>
        ) : (
          /* Workspace grid */
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 dark:bg-transparent">
              {workspaces.map((workspace: Workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onDelete={handleDeleteWorkspace}
                  isDeleting={deletingId === workspace.id}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Page {currentPage} of {totalPages} • {totalWorkspaces} total workspaces
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Show:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page when changing page size
                      }}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm">{currentPage}</span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create workspace form modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <CreateWorkspaceForm onSuccess={handleCreateSuccess} onCancel={handleCreateCancel} />
        </div>
      )}
    </div>
  );
}
