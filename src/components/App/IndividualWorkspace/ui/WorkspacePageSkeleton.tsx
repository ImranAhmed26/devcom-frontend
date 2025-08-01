"use client";

/**
 * Skeleton loading component for WorkspacePage
 * Matches the actual layout structure for consistent loading experience
 */
export function WorkspacePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-4 p-4 sm:p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="px-6 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left side placeholder */}
              <div className="flex-1"></div>

              {/* Right side - Stats & Actions */}
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="text-center">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8 mb-1"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md w-20"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-1">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-28"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6">
          {/* Content Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>

          {/* Table Header Skeleton */}
          <div className="hidden md:block">
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg mb-4">
              <div className="grid grid-cols-7 gap-4 px-6 py-3">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Rows Skeleton */}
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                {/* Desktop Row */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-7 gap-4 px-6 py-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="block md:hidden p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4 mt-1"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
