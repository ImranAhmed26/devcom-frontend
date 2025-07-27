"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, Image, File, X, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useWorkspaceStore } from "../store/workspaceStore";
import { useUploadDocuments } from "../hooks";
import type { UploadItem } from "../types";

interface UploadZoneProps {
  workspaceId: string;
  onUploadComplete?: (documents: any[]) => void;
  disabled?: boolean;
  className?: string;
}

interface FileValidationResult {
  valid: boolean;
  error?: string;
}

const ALLOWED_FILE_TYPES = {
  "application/pdf": { icon: FileText, label: "PDF" },
  "image/jpeg": { icon: Image, label: "JPEG" },
  "image/jpg": { icon: Image, label: "JPG" },
  "image/png": { icon: Image, label: "PNG" },
  "image/tiff": { icon: Image, label: "TIFF" },
  "image/webp": { icon: Image, label: "WebP" },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;

export function UploadZone({ workspaceId, onUploadComplete, disabled, className = "" }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadDocuments();
  const workspace = useWorkspaceStore((state) => state.workspace);

  // File validation
  const validateFile = (file: File): FileValidationResult => {
    // Check file type
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
      return {
        valid: false,
        error: `File type "${file.type}" is not supported. Allowed types: ${Object.values(ALLOWED_FILE_TYPES)
          .map((t) => t.label)
          .join(", ")}`,
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File "${file.name}" is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Check for empty files
    if (file.size === 0) {
      return {
        valid: false,
        error: `File "${file.name}" is empty`,
      };
    }

    return { valid: true };
  };

  // Process selected files
  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const errors: string[] = [];
      const validFiles: File[] = [];

      // Check total file count
      if (fileArray.length > MAX_FILES) {
        errors.push(`Too many files selected. Maximum is ${MAX_FILES} files at once.`);
        setValidationErrors(errors);
        return;
      }

      // Validate each file
      fileArray.forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else {
          errors.push(validation.error!);
        }
      });

      setValidationErrors(errors);

      // Create upload items for valid files
      if (validFiles.length > 0) {
        const uploadItems: UploadItem[] = validFiles.map((file) => ({
          id: `upload-${Date.now()}-${Math.random()}`,
          file,
          progress: 0,
          status: "pending",
        }));

        setUploadQueue(uploadItems);

        // Start upload
        uploadMutation.mutate(
          {
            workspaceId,
            files: validFiles,
            autoProcess: workspace?.settings.autoProcess ?? true,
          },
          {
            onSuccess: (documents) => {
              // Update upload items to completed
              setUploadQueue((prev) =>
                prev.map((item) => ({
                  ...item,
                  status: "completed" as const,
                  progress: 100,
                }))
              );

              // Clear queue after a delay
              setTimeout(() => {
                setUploadQueue([]);
                setValidationErrors([]);
              }, 2000);

              onUploadComplete?.(documents);
            },
            onError: (error) => {
              // Update upload items to failed
              setUploadQueue((prev) =>
                prev.map((item) => ({
                  ...item,
                  status: "failed" as const,
                  error: error.message,
                }))
              );
            },
          }
        );
      }
    },
    [workspaceId, workspace?.settings.autoProcess, uploadMutation, onUploadComplete]
  );

  // Drag and drop handlers
  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    },
    [disabled, processFiles]
  );

  // File input handler
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
      // Reset input value to allow selecting the same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFiles]
  );

  // Click handler for upload zone
  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  // Remove upload item
  const removeUploadItem = useCallback((itemId: string) => {
    setUploadQueue((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Get file icon
  const getFileIcon = (mimeType: string) => {
    const fileType = ALLOWED_FILE_TYPES[mimeType as keyof typeof ALLOWED_FILE_TYPES];
    return fileType ? fileType.icon : File;
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

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${
            isDragOver
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={Object.keys(ALLOWED_FILE_TYPES).join(",")}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        <div className="space-y-4">
          <div
            className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
              isDragOver
                ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            }`}
          >
            <Upload className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {isDragOver ? "Drop files here" : "Upload documents"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Drag and drop files here, or click to select files</p>

            <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
              <p>
                Supported formats:{" "}
                {Object.values(ALLOWED_FILE_TYPES)
                  .map((t) => t.label)
                  .join(", ")}
              </p>
              <p>
                Maximum file size: {MAX_FILE_SIZE / (1024 * 1024)}MB • Maximum {MAX_FILES} files at once
              </p>
              {workspace?.settings.autoProcess && (
                <p className="text-indigo-600 dark:text-indigo-400">✓ Auto-processing enabled</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Upload Errors</h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Upload Queue */}
      {uploadQueue.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Upload Progress ({uploadQueue.length} file{uploadQueue.length !== 1 ? "s" : ""})
          </h4>

          <div className="space-y-3">
            {uploadQueue.map((item) => {
              const FileIcon = getFileIcon(item.file.type);

              return (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0">
                    <FileIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.file.name}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(item.file.size)}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          item.status === "completed" ? "bg-green-500" : item.status === "failed" ? "bg-red-500" : "bg-indigo-500"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.status === "pending" && (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin text-indigo-500" />
                            <span className="text-xs text-indigo-600 dark:text-indigo-400">Uploading...</span>
                          </>
                        )}
                        {item.status === "completed" && (
                          <>
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">Completed</span>
                          </>
                        )}
                        {item.status === "failed" && (
                          <>
                            <AlertCircle className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-red-600 dark:text-red-400">Failed: {item.error}</span>
                          </>
                        )}
                      </div>

                      {item.status !== "pending" && (
                        <button
                          onClick={() => removeUploadItem(item.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
