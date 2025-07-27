"use client";

import { AlertTriangle, X, Trash2 } from "lucide-react";

interface DeleteWorkspaceModalProps {
  workspaceName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteWorkspaceModal({ workspaceName, onConfirm, onCancel, isDeleting }: DeleteWorkspaceModalProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
          Delete Workspace
        </h3>
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Are you sure you want to delete <span className="font-semibold">{`${workspaceName}`}</span>?
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <p className="text-sm text-red-700 dark:text-red-300">
            This action cannot be undone and will permanently remove all associated documents and jobs.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isDeleting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Workspace
            </>
          )}
        </button>
      </div>
    </div>
  );
}
