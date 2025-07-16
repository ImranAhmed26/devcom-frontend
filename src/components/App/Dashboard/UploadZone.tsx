"use client";

import type React from "react";
import { useState } from "react";
import { Upload, FileText, ImageIcon } from "lucide-react";
import { AppButton } from "@/components/Interface/Button/AppButton";

export function UploadZone() {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div
      className={`border-2 border-dashed rounded-medium transition-colors ${
        isDragOver
          ? "border-brandLight bg-violet-50 dark:border-brandDark dark:bg-hexaGray"
          : "border-gray-300 dark:border-gray-700"
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
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
          Drag and drop your images or PDFs here, or click to browse files
        </p>
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
        <AppButton onClick={() => {}} icon={<Upload className="h-4 w-4" />}>
          Upload
        </AppButton>
      </div>
    </div>
  );
}

//LOVABLE CODE

// import React, { useState, useRef } from 'react';
// import Card from '../ui/Card';
// import Button from '../ui/Button';

// interface FileUploadProps {
//   onFileSelect: (files: File[]) => void;
//   acceptedTypes?: string[];
//   maxSize?: number; // in MB
// }
//
// const FileUpload: React.FC<FileUploadProps> = ({
//   onFileSelect,
//   acceptedTypes = ['image/*', 'application/pdf'],
//   maxSize = 10
// }) => {
//   const [isDragOver, setIsDragOver] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     onFileSelect(files);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       onFileSelect(files);
//     }
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <Card className={`transition-all duration-200 ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'}`}>
//       <div
//         className="text-center py-8"
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <div className="text-4xl mb-4">📄</div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
//         <p className="text-gray-600 mb-4">
//           Drag and drop your files here, or click to browse
//         </p>
//         <Button onClick={openFileDialog} variant="primary">
//           Choose Files
//         </Button>
//         <p className="text-xs text-gray-500 mt-3">
//           Supports PDF, JPG, PNG up to {maxSize}MB
//         </p>
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           accept={acceptedTypes.join(',')}
//           onChange={handleFileSelect}
//           className="hidden"
//         />
//       </div>
//     </Card>
//   );
// };

// export default FileUpload;

// BOLT CODE

// 'use client';
// import { useState, useRef } from 'react';
// import { Upload, FileText, Image, X, CheckCircle, AlertCircle } from 'lucide-react';

// interface UploadZoneProps {
//   expanded?: boolean;
// }

// interface UploadedFile {
//   id: string;
//   name: string;
//   size: number;
//   type: string;
//   status: 'uploading' | 'processing' | 'completed' | 'error';
// }

// export default function UploadZone({ expanded = false }: UploadZoneProps) {
//   const [isDragOver, setIsDragOver] = useState(false);
//   const [files, setFiles] = useState<UploadedFile[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     processFiles(droppedFiles);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = Array.from(e.target.files);
//       processFiles(selectedFiles);
//     }
//   };

//   const processFiles = (fileList: File[]) => {
//     const newFiles: UploadedFile[] = fileList.map((file) => ({
//       id: Math.random().toString(36).substr(2, 9),
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       status: 'uploading',
//     }));

//     setFiles(prev => [...prev, ...newFiles]);

//     // Simulate upload and processing
//     newFiles.forEach((file, index) => {
//       setTimeout(() => {
//         setFiles(prev => prev.map(f =>
//           f.id === file.id ? { ...f, status: 'processing' } : f
//         ));

//         setTimeout(() => {
//           setFiles(prev => prev.map(f =>
//             f.id === file.id ? { ...f, status: 'completed' } : f
//           ));
//         }, 2000);
//       }, index * 500);
//     });
//   };

//   const removeFile = (id: string) => {
//     setFiles(prev => prev.filter(f => f.id !== id));
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
//       case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
//       default: return null;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'uploading': return 'badge badge-secondary';
//       case 'processing': return 'badge badge-default';
//       case 'completed': return 'badge bg-green-100 text-green-800 border-green-200';
//       case 'error': return 'badge badge-destructive';
//       default: return 'badge badge-outline';
//     }
//   };

//   const getFileIcon = (type: string) => {
//     if (type.startsWith('image/')) return Image;
//     return FileText;
//   };

//   return (
//     <div className={`card ${expanded ? 'p-8' : 'p-6'}`}>
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Upload Documents</h2>
//         <p className="text-sm text-muted-foreground">Drag and drop files or click to browse</p>
//       </div>

//       <div
//         className={`upload-zone rounded-lg p-8 text-center transition-all cursor-pointer ${
//           isDragOver ? 'drag-over' : ''
//         } ${expanded ? 'min-h-64' : 'min-h-32'}`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
//         <p className="text-lg font-medium mb-2">
//           Drop files here or click to upload
//         </p>
//         <p className="text-sm text-muted-foreground">
//           Supports PDF, JPG, PNG, TIFF up to 10MB each
//         </p>

//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           accept=".pdf,.jpg,.jpeg,.png,.tiff,.tif"
//           onChange={handleFileSelect}
//           className="hidden"
//         />
//       </div>

//       {files.length > 0 && (
//         <div className="mt-6 space-y-3">
//           <h3 className="text-sm font-medium">Uploaded Files</h3>
//           {files.map((file) => {
//             const FileIcon = getFileIcon(file.type);
//             return (
//               <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <FileIcon className="h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <p className="text-sm font-medium">{file.name}</p>
//                     <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className={getStatusBadge(file.status)}>
//                     {file.status === 'processing' && (
//                       <span className="processing-animation">Processing...</span>
//                     )}
//                     {file.status !== 'processing' && file.status}
//                   </span>
//                   {getStatusIcon(file.status)}
//                   <button
//                     onClick={() => removeFile(file.id)}
//                     className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded-sm hover:bg-destructive/10"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
