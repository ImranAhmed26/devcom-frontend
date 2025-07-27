"use client";

import { useState } from "react";
import {
  FileText,
  Image,
  File,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  MoreHorizontal,
  Eye,
  Download,
  RotateCcw,
  Trash2,
  Grid3X3,
  List,
} from "lucide-react";
import { useWorkspaceStore } from "../store/workspaceStore";
import type { Document, DocumentStatus } from "../types";

interface DocumentListProps {
  documents: Document[];
  onDocumentSelect: (document: Document) => void;
  onDocumentDelete: (documentId: string) => void;
  onDocumentReprocess: (documentId: string) => void;
  onDocumentDownload: (documentId: string) => void;
  isLoading?: boolean;
  className?: string;
}

interface DocumentCardProps {
  document: Document;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onSelect: () => void;
  onToggleSelect: () => void;
  onView: () => void;
  onDelete: () => void;
  onReprocess: () => void;
  onDownload: () => void;
}

function DocumentCard({
  document,
  isSelected,
  viewMode,
  onSelect,
  onToggleSelect,
  onView,
  onDelete,
  onReprocess,
  onDownload,
}: DocumentCardProps) {
  const [showActions, setShowActions] = useState(false);

  // Get file icon based on mime type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return Image;
    if (mimeType === "application/pdf") return FileText;
    return File;
  };

  // Get status color and icon
  const getStatusDisplay = (status: DocumentStatus) => {
    switch (status) {
      case "uploading":
        return {
          icon: Upload,
          color: "text-blue-500",
          bg: "bg-blue-50 dark:bg-blue-900/20",
          label: "Uploading",
        };
      case "queued":
        return {
          icon: Clock,
          color: "text-yellow-500",
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          label: "Queued",
        };
      case "processing":
        return {
          icon: Clock,
          color: "text-yellow-500",
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          label: "Processing",
        };
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bg: "bg-green-50 dark:bg-green-900/20",
          label: "Completed",
        };
      case "failed":
        return {
          icon: XCircle,
          color: "text-red-500",
          bg: "bg-red-50 dark:bg-red-900/20",
          label: "Failed",
        };
      default:
        return {
          icon: File,
          color: "text-gray-500",
          bg: "bg-gray-50 dark:bg-gray-900/20",
          label: "Unknown",
        };
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const FileIcon = getFileIcon(document.mimeType);
  const statusDisplay = getStatusDisplay(document.status);
  const StatusIcon = statusDisplay.icon;

  if (viewMode === "list") {
    return (
      <div
        className={`
        flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg
        hover:shadow-md transition-all cursor-pointer
        ${isSelected ? "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "bg-white dark:bg-gray-800"}
      `}
      >
        {/* Selection Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />

        {/* File Icon */}
        <div className="flex-shrink-0">
          <FileIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Document Info */}
        <div className="flex-1 min-w-0" onClick={onSelect}>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{document.originalName}</h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusDisplay.bg}`}>
              <StatusIcon className={`h-3 w-3 ${statusDisplay.color}`} />
              <span className={statusDisplay.color}>{statusDisplay.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatFileSize(document.fileSize)}</span>
            <span>{formatDate(document.uploadedAt)}</span>
            {document.ocrResults && (
              <span className="text-green-600 dark:text-green-400">
                {Math.round(document.ocrResults.confidence * 100)}% confidence
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {document.status === "completed" && (
            <button
              onClick={onView}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title="View document"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onDownload}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Download document"
          >
            <Download className="h-4 w-4" />
          </button>

          {document.status === "failed" && (
            <button
              onClick={onReprocess}
              className="p-2 text-yellow-500 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              title="Reprocess document"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onDelete();
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className={`
      relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg
      hover:shadow-md transition-all cursor-pointer
      ${isSelected ? "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "bg-white dark:bg-gray-800"}
    `}
    >
      {/* Selection Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
        className="absolute top-3 left-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded z-10"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Status Badge */}
      <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusDisplay.bg}`}>
        <StatusIcon className={`h-3 w-3 ${statusDisplay.color}`} />
        <span className={statusDisplay.color}>{statusDisplay.label}</span>
      </div>

      <div onClick={onSelect} className="pt-6">
        {/* File Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <FileIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Document Info */}
        <div className="text-center mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{document.originalName}</h3>

          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>{formatFileSize(document.fileSize)}</div>
            <div>{formatDate(document.uploadedAt)}</div>
            {document.ocrResults && (
              <div className="text-green-600 dark:text-green-400">
                {Math.round(document.ocrResults.confidence * 100)}% confidence
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2">
          {document.status === "completed" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title="View document"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Download document"
          >
            <Download className="h-4 w-4" />
          </button>

          {document.status === "failed" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReprocess();
              }}
              className="p-2 text-yellow-500 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              title="Reprocess document"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Delete document"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function DocumentList({
  documents,
  onDocumentSelect,
  onDocumentDelete,
  onDocumentReprocess,
  onDocumentDownload,
  isLoading,
  className = "",
}: DocumentListProps) {
  const selectedDocuments = useWorkspaceStore((state) => state.ui.selectedDocuments);
  const viewMode = useWorkspaceStore((state) => state.ui.viewMode);
  const setSelectedDocument = useWorkspaceStore((state) => state.setSelectedDocument);
  const toggleDocumentSelection = useWorkspaceStore((state) => state.toggleDocumentSelection);
  const setViewMode = useWorkspaceStore((state) => state.setViewMode);
  const clearSelection = useWorkspaceStore((state) => state.clearSelection);

  // Handle document selection
  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    onDocumentSelect(document);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      clearSelection();
    } else {
      documents.forEach((doc) => {
        if (!selectedDocuments.includes(doc.id)) {
          toggleDocumentSelection(doc.id);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div
          className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <FileText className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No documents found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Upload some documents to get started with OCR processing.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Documents ({documents.length})</h2>

          {documents.length > 0 && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDocuments.length === documents.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedDocuments.length > 0 ? `${selectedDocuments.length} selected` : "Select all"}
              </span>
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            title="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleViewModeChange("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            title="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Document Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}>
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            isSelected={selectedDocuments.includes(document.id)}
            viewMode={viewMode}
            onSelect={() => handleDocumentSelect(document)}
            onToggleSelect={() => toggleDocumentSelection(document.id)}
            onView={() => handleDocumentSelect(document)}
            onDelete={() => onDocumentDelete(document.id)}
            onReprocess={() => onDocumentReprocess(document.id)}
            onDownload={() => onDocumentDownload(document.id)}
          />
        ))}
      </div>
    </div>
  );
}
