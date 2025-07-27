"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Workspace page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">There was an error loading this workspace. Please try again.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/workspace"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Workspaces
          </Link>
        </div>
      </div>
    </div>
  );
}
