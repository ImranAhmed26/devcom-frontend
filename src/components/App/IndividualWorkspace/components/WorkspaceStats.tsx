"use client";

import { FileText, Clock, CheckCircle, XCircle, HardDrive, TrendingUp, Activity } from "lucide-react";
import type { WorkspaceStats as WorkspaceStatsType } from "../types";

interface WorkspaceStatsProps {
  stats: WorkspaceStatsType;
  isLoading?: boolean;
  className?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red" | "gray" | "purple";
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

function StatCard({ title, value, icon, color, subtitle, trend, isLoading }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    gray: "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg border ${colorClasses[color]}`}>{icon}</div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>

        {trend && (
          <div
            className={`flex items-center gap-1 text-xs ${
              trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            <TrendingUp className={`h-3 w-3 ${trend.isPositive ? "" : "rotate-180"}`} />
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}

export function WorkspaceStats({ stats, isLoading, className = "" }: WorkspaceStatsProps) {
  // Format storage size
  const formatStorageSize = (bytes: number): string => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Calculate completion rate
  const completionRate = stats.totalDocuments > 0 ? Math.round((stats.completedDocuments / stats.totalDocuments) * 100) : 0;

  // Format processing time
  const formatProcessingTime = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${className}`}>
      {/* Total Documents */}
      <StatCard
        title="Total Documents"
        value={stats.totalDocuments}
        icon={<FileText className="h-4 w-4" />}
        color="blue"
        subtitle={`${completionRate}% completed`}
        isLoading={isLoading}
      />

      {/* Processing Documents */}
      <StatCard
        title="Processing"
        value={stats.processingDocuments}
        icon={<Clock className="h-4 w-4" />}
        color="yellow"
        subtitle={stats.processingDocuments > 0 ? "In progress" : "None processing"}
        isLoading={isLoading}
      />

      {/* Completed Documents */}
      <StatCard
        title="Completed"
        value={stats.completedDocuments}
        icon={<CheckCircle className="h-4 w-4" />}
        color="green"
        subtitle={`${completionRate}% success rate`}
        isLoading={isLoading}
      />

      {/* Failed Documents */}
      <StatCard
        title="Failed"
        value={stats.failedDocuments}
        icon={<XCircle className="h-4 w-4" />}
        color={stats.failedDocuments > 0 ? "red" : "gray"}
        subtitle={stats.failedDocuments > 0 ? "Need attention" : "No failures"}
        isLoading={isLoading}
      />

      {/* Storage Used */}
      <StatCard
        title="Storage Used"
        value={formatStorageSize(stats.totalStorageUsed)}
        icon={<HardDrive className="h-4 w-4" />}
        color="purple"
        subtitle={`${stats.totalDocuments} files`}
        isLoading={isLoading}
      />

      {/* Processing Time */}
      <StatCard
        title="Avg. Processing"
        value={formatProcessingTime(stats.processingTimeAvg)}
        icon={<Activity className="h-4 w-4" />}
        color="gray"
        subtitle="Per document"
        isLoading={isLoading}
      />
    </div>
  );
}

// Quick stats bar for compact display
interface QuickStatsBarProps {
  stats: WorkspaceStatsType;
  isLoading?: boolean;
  className?: string;
}

export function QuickStatsBar({ stats, isLoading, className = "" }: QuickStatsBarProps) {
  if (isLoading) {
    return (
      <div className={`flex items-center gap-6 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          </div>
        ))}
      </div>
    );
  }

  const completionRate = stats.totalDocuments > 0 ? Math.round((stats.completedDocuments / stats.totalDocuments) * 100) : 0;

  return (
    <div className={`flex items-center gap-6 text-sm ${className}`}>
      <div className="text-center">
        <div className="font-semibold text-gray-900 dark:text-gray-100">{stats.totalDocuments}</div>
        <div className="text-gray-500 dark:text-gray-400">Total</div>
      </div>

      <div className="text-center">
        <div className="font-semibold text-yellow-600 dark:text-yellow-400">{stats.processingDocuments}</div>
        <div className="text-gray-500 dark:text-gray-400">Processing</div>
      </div>

      <div className="text-center">
        <div className="font-semibold text-green-600 dark:text-green-400">{stats.completedDocuments}</div>
        <div className="text-gray-500 dark:text-gray-400">Completed</div>
      </div>

      {stats.failedDocuments > 0 && (
        <div className="text-center">
          <div className="font-semibold text-red-600 dark:text-red-400">{stats.failedDocuments}</div>
          <div className="text-gray-500 dark:text-gray-400">Failed</div>
        </div>
      )}

      <div className="text-center">
        <div className="font-semibold text-blue-600 dark:text-blue-400">{completionRate}%</div>
        <div className="text-gray-500 dark:text-gray-400">Success</div>
      </div>
    </div>
  );
}
