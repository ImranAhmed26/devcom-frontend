"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  // ArrowLeft, Edit3 , Check, X,
  Settings,
  Download,
  Users,
  MoreHorizontal,
} from "lucide-react";
import { useAuth } from "@/lib/auth/authStore";
import { canManageWorkspaceMembers } from "@/lib/auth/permissions";
// import { useUpdateWorkspace } from "../hooks";
import type { Workspace } from "../types";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  onSettingsClick?: () => void;
  onExportAllClick?: () => void;
}

export function WorkspaceHeader({ workspace, onSettingsClick, onExportAllClick }: WorkspaceHeaderProps) {
  const { user } = useAuth();
  // const [isEditingName, setIsEditingName] = useState(false);
  // const [editedName, setEditedName] = useState(workspace.name);
  const [showActions, setShowActions] = useState(false);

  // const updateWorkspaceMutation = useUpdateWorkspace();

  // Check permissions
  const canManageWorkspace = workspace.ownerId === user?.id;
  const canManageMembers = canManageWorkspaceMembers(user);

  // const handleNameEdit = () => {
  //   if (!canManageWorkspace) return;
  //   setIsEditingName(true);
  //   setEditedName(workspace.name);
  // };

  // const handleNameSave = async () => {
  //   if (editedName.trim() && editedName !== workspace.name) {
  //     try {
  //       await updateWorkspaceMutation.mutateAsync({
  //         workspaceId: workspace.id,
  //         updates: { name: editedName.trim() },
  //       });
  //     } catch {
  //       // Reset on error - the mutation will handle error display
  //       setEditedName(workspace.name);
  //     }
  //   }
  //   setIsEditingName(false);
  // };

  // const handleNameCancel = () => {
  //   setEditedName(workspace.name);
  //   setIsEditingName(false);
  // };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     handleNameSave();
  //   } else if (e.key === "Escape") {
  //     handleNameCancel();
  //   }
  // };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/workspace" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            Workspaces
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">{workspace.name}</span>
        </div>

        {/* Right Side - Stats & Actions */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{workspace.stats.totalDocuments}</div>
              <div className="text-gray-500 dark:text-gray-400">Documents</div>
            </div>

            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{workspace.stats.processingDocuments}</div>
              <div className="text-gray-500 dark:text-gray-400">Processing</div>
            </div>

            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{workspace.stats.completedDocuments}</div>
              <div className="text-gray-500 dark:text-gray-400">Completed</div>
            </div>

            {workspace.stats.failedDocuments > 0 && (
              <div className="text-center">
                <div className="font-semibold text-red-600 dark:text-red-400">{workspace.stats.failedDocuments}</div>
                <div className="text-gray-500 dark:text-gray-400">Failed</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Members Count */}
            {canManageMembers && (
              <button
                onClick={onSettingsClick}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                title="Manage members"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{workspace.members.length}</span>
              </button>
            )}

            {/* Export All Button */}
            <button
              onClick={onExportAllClick}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              title="Export all documents"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export All</span>
            </button>

            {/* Settings Button - Only for owners */}
            {canManageWorkspace && (
              <button
                onClick={onSettingsClick}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                title="Workspace settings"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            )}

            {/* More Actions - Mobile */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onExportAllClick?.();
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Download className="h-4 w-4" />
                      Export All
                    </button>

                    {canManageMembers && (
                      <button
                        onClick={() => {
                          onSettingsClick?.();
                          setShowActions(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Users className="h-4 w-4" />
                        Manage Members
                      </button>
                    )}

                    {canManageWorkspace && (
                      <button
                        onClick={() => {
                          onSettingsClick?.();
                          setShowActions(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Processing Status Bar */}
        {/* {workspace.stats.processingDocuments > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <span className="text-sm text-blue-800 dark:text-blue-200">
                  Processing {workspace.stats.processingDocuments} document{workspace.stats.processingDocuments !== 1 ? "s" : ""}
                  ...
                </span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Avg. time: {Math.round(workspace.stats.processingTimeAvg)}s
              </div>
            </div>
          </div>
        )} */}

        {/* Error Status Bar */}
        {/* {workspace.stats.failedDocuments > 0 && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-800 dark:text-red-200">
                {workspace.stats.failedDocuments} document{workspace.stats.failedDocuments !== 1 ? "s" : ""} failed processing
              </span>
              <button className="text-xs text-red-600 dark:text-red-400 hover:underline">View Details</button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
