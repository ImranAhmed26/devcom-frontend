export default function Loading() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}