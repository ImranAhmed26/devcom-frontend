'use client';
import { useState, useRef } from 'react';
import { Upload, FileText, Image, X, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  expanded?: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

export default function UploadZone({ expanded = false }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: 'processing' } : f)));

        setTimeout(() => {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: 'completed' } : f)));
        }, 2000);
      }, index * 500);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-600' />;
      case 'error':
        return <AlertCircle className='h-4 w-4 text-destructive' />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'badge badge-secondary';
      case 'processing':
        return 'badge badge-default';
      case 'completed':
        return 'badge bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'badge badge-destructive';
      default:
        return 'badge badge-outline';
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    return FileText;
  };

  return (
    <div className={`card ${expanded ? 'p-8' : 'p-6'}`}>
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Upload Documents</h2>
        <p className='text-sm text-muted-foreground'>Drag and drop files or click to browse</p>
      </div>

      <div
        className={`upload-zone rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragOver ? 'drag-over' : ''
        } ${expanded ? 'min-h-64' : 'min-h-32'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className='mx-auto h-10 w-10 text-muted-foreground mb-4' />
        <p className='text-lg font-medium mb-2'>Drop files here or click to upload</p>
        <p className='text-sm text-muted-foreground'>Supports PDF, JPG, PNG, TIFF up to 10MB each</p>

        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='.pdf,.jpg,.jpeg,.png,.tiff,.tif'
          onChange={handleFileSelect}
          className='hidden'
        />
      </div>

      {files.length > 0 && (
        <div className='mt-6 space-y-3'>
          <h3 className='text-sm font-medium'>Uploaded Files</h3>
          {files.map((file) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div key={file.id} className='flex items-center justify-between p-3 bg-muted rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <FileIcon className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>{file.name}</p>
                    <p className='text-xs text-muted-foreground'>{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className={getStatusBadge(file.status)}>
                    {file.status === 'processing' && <span className='processing-animation'>Processing...</span>}
                    {file.status !== 'processing' && file.status}
                  </span>
                  {getStatusIcon(file.status)}
                  <button
                    onClick={() => removeFile(file.id)}
                    className='p-1 text-muted-foreground hover:text-destructive transition-colors rounded-sm hover:bg-destructive/10'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
