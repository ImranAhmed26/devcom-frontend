"use client"

import type React from "react"
import { useState } from "react"
import { Upload, FileText, ImageIcon } from "lucide-react"

export function UploadZone() {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    // Handle file drop logic here
  }

  return (
    <div
      className={`border-2 border-dashed rounded-medium transition-colors ${
        isDragOver ? "border-brandLight bg-violet-50 dark:border-brandDark dark:bg-hexaGray" : "border-gray-300 dark:border-gray-700"
      }`}
    >
      <div
        className="flex flex-col items-center justify-center p-8 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
          <Upload className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">Drag and drop your images or PDFs here, or click to browse files</p>
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
            <ImageIcon className="h-3 w-3" />
            JPG, PNG
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
            <FileText className="h-3 w-3" />
            PDF
          </div>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-brandLight dark:bg-brandDark text-white dark:text-gray-800 text-sm font-medium hover:bg-brandDark transition-colors rounded-small">
          <Upload className="mr-2 h-4 w-4" />
          Choose Files
        </button>
      </div>
    </div>
  )
}
