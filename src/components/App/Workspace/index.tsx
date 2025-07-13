"use client";

import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { workspaces } from "@/constants/AppConstants";

export function WorkSpaceList() {
  return (
    <div className="rounded-medium border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-quadraGray rounded-t-medium">
        <h2 className="text-lg font-semibold dark:text-white">Your Workspaces</h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 dark:bg-transparent">
        {workspaces.data.map((ws) => (
          <Link
            key={ws.id}
            href={`/app/workspace/${ws.id}`}
            className="group border border-gray-200 dark:border-gray-600 rounded-xl p-5 bg-white dark:bg-hexaGray hover:shadow-md transition-shadow"
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
    </div>
  );
}
