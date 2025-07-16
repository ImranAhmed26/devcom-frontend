"use client";

import { Link } from "@/i18n/navigation";
import { FolderPlus, FolderKanban, Layers } from "lucide-react";
import { workspaces } from "@/constants/AppConstants";
import { AppButton } from "@/components/Interface/Button/AppButton";

export function RecentWorkSpaceList() {
  const hasWorkspaces = workspaces?.data?.length > 0;
  const recentWorkspaces = workspaces.data.slice(0, 6); // Max 6 items

  return (
    <div className="rounded-medium border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-quadraGray rounded-t-medium">
        <h2 className="text-lg font-semibold dark:text-white">Your Recent Workspaces</h2>
        <div className="flex gap-2">
          <AppButton href="/workspace" icon={<Layers className="h-4 w-4" />}>
            View All
          </AppButton>

          <AppButton onClick={() => {}} icon={<FolderPlus className="h-4 w-4" />}>
            Add Workspace
          </AppButton>
        </div>
      </div>

      <div className="p-6">
        {hasWorkspaces ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentWorkspaces.map((ws) => (
              <Link
                key={ws.id}
                href={`/app/workspace/${ws.id}`}
                className="group border border-gray-100 dark:border-gray-600 rounded-xl p-5 bg-white dark:bg-hexaGray hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 dark:bg-quadraGray p-3 rounded-lg">
                    <FolderKanban className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white group-hover:underline">{ws.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {ws.documents.length} document{ws.documents.length !== 1 && "s"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Created on {ws.createdAt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-hexaGray/30">
            <FolderKanban className="w-10 h-10 mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-md font-semibold text-gray-700 dark:text-white mb-1">No workspaces found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Start by creating a workspace to organize your documents.
            </p>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white dark:text-gray-800 bg-brandLight hover:bg-brandDark dark:bg-brandDark dark:hover:bg-brandLight rounded-small">
              <FolderPlus className="mr-2 h-4 w-4" />
              Add Workspace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
