// Mock data for Individual Workspace feature
// This will be replaced with real API calls when backend is ready

import type { Workspace, Document, OCRResult, ProcessingJob } from "../types";

// Mock workspace data
export const mockWorkspace: Workspace = {
  id: "ws-1",
  name: "Invoice Processing Workspace",
  description: "Workspace for processing invoices and receipts",
  ownerId: "user-1",
  members: [
    {
      id: "member-1",
      userId: "user-1",
      workspaceId: "ws-1",
      role: "owner",
      email: "john@company.com",
      name: "John Doe",
      joinedAt: "2024-01-15T10:00:00Z",
      lastActiveAt: "2024-01-20T14:30:00Z",
    },
    {
      id: "member-2",
      userId: "user-2",
      workspaceId: "ws-1",
      role: "editor",
      email: "jane@company.com",
      name: "Jane Smith",
      joinedAt: "2024-01-16T09:00:00Z",
      lastActiveAt: "2024-01-20T11:15:00Z",
    },
  ],
  settings: {
    ocrLanguage: "en",
    ocrQuality: "balanced",
    autoProcess: true,
    retentionDays: 90,
    allowedFileTypes: ["image/jpeg", "image/png", "application/pdf"],
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  stats: {
    totalDocuments: 24,
    processingDocuments: 2,
    completedDocuments: 20,
    failedDocuments: 2,
    totalStorageUsed: 156 * 1024 * 1024, // 156MB
    processingTimeAvg: 45, // seconds
    lastActivity: "2024-01-20T14:30:00Z",
  },
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z",
};

// Mock OCR results
export const mockOCRResults: OCRResult[] = [
  {
    id: "ocr-1",
    documentId: "doc-1",
    extractedText:
      "INVOICE\n\nCompany: ABC Corp\nDate: 2024-01-15\nAmount: $1,250.00\n\nDescription: Professional services for January 2024\n\nThank you for your business!",
    confidence: 0.95,
    processingTime: 42,
    language: "en",
    metadata: {
      pageCount: 1,
      imageWidth: 2480,
      imageHeight: 3508,
      dpi: 300,
      processingEngine: "Tesseract",
      processingVersion: "5.3.0",
    },
    regions: [
      {
        id: "region-1",
        text: "INVOICE",
        confidence: 0.98,
        boundingBox: { x: 100, y: 50, width: 200, height: 40 },
        wordCount: 1,
      },
      {
        id: "region-2",
        text: "Company: ABC Corp",
        confidence: 0.94,
        boundingBox: { x: 100, y: 120, width: 300, height: 25 },
        wordCount: 3,
      },
    ],
    createdAt: "2024-01-20T10:15:00Z",
  },
  {
    id: "ocr-2",
    documentId: "doc-2",
    extractedText:
      "RECEIPT\n\nStore: Tech Supplies Inc\nDate: 2024-01-18\nTotal: $89.99\n\nItems:\n- USB Cable x2: $29.98\n- Wireless Mouse: $59.99\n\nTax: $8.99\nTotal: $89.99",
    confidence: 0.87,
    processingTime: 38,
    language: "en",
    metadata: {
      pageCount: 1,
      imageWidth: 1240,
      imageHeight: 1754,
      dpi: 150,
      processingEngine: "Tesseract",
      processingVersion: "5.3.0",
    },
    createdAt: "2024-01-20T11:30:00Z",
  },
];

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    workspaceId: "ws-1",
    filename: "invoice_abc_corp_jan2024.pdf",
    originalName: "Invoice - ABC Corp - January 2024.pdf",
    fileSize: 2.4 * 1024 * 1024, // 2.4MB
    mimeType: "application/pdf",
    uploadedAt: "2024-01-20T10:00:00Z",
    status: "completed",
    ocrResults: mockOCRResults[0],
    thumbnailUrl: "/api/documents/doc-1/thumbnail",
    downloadUrl: "/api/documents/doc-1/download",
    uploadedBy: "user-1",
  },
  {
    id: "doc-2",
    workspaceId: "ws-1",
    filename: "receipt_tech_supplies_20240118.jpg",
    originalName: "Receipt - Tech Supplies - 2024-01-18.jpg",
    fileSize: 1.8 * 1024 * 1024, // 1.8MB
    mimeType: "image/jpeg",
    uploadedAt: "2024-01-20T11:15:00Z",
    status: "completed",
    ocrResults: mockOCRResults[1],
    thumbnailUrl: "/api/documents/doc-2/thumbnail",
    downloadUrl: "/api/documents/doc-2/download",
    uploadedBy: "user-2",
  },
  {
    id: "doc-3",
    workspaceId: "ws-1",
    filename: "invoice_xyz_services_pending.pdf",
    originalName: "Invoice - XYZ Services - Pending.pdf",
    fileSize: 3.1 * 1024 * 1024, // 3.1MB
    mimeType: "application/pdf",
    uploadedAt: "2024-01-20T14:00:00Z",
    status: "processing",
    thumbnailUrl: "/api/documents/doc-3/thumbnail",
    downloadUrl: "/api/documents/doc-3/download",
    processingJobId: "job-1",
    uploadedBy: "user-1",
  },
  {
    id: "doc-4",
    workspaceId: "ws-1",
    filename: "receipt_coffee_shop_failed.jpg",
    originalName: "Receipt - Coffee Shop - Failed.jpg",
    fileSize: 0.9 * 1024 * 1024, // 0.9MB
    mimeType: "image/jpeg",
    uploadedAt: "2024-01-20T13:30:00Z",
    status: "failed",
    thumbnailUrl: "/api/documents/doc-4/thumbnail",
    downloadUrl: "/api/documents/doc-4/download",
    processingJobId: "job-2",
    uploadedBy: "user-1",
  },
  {
    id: "doc-5",
    workspaceId: "ws-1",
    filename: "invoice_monthly_report.pdf",
    originalName: "Monthly Report Invoice.pdf",
    fileSize: 4.2 * 1024 * 1024, // 4.2MB
    mimeType: "application/pdf",
    uploadedAt: "2024-01-20T09:00:00Z",
    status: "completed",
    ocrResults: {
      id: "ocr-5",
      documentId: "doc-5",
      extractedText:
        "MONTHLY REPORT\n\nPeriod: January 2024\nTotal Revenue: $15,750.00\nExpenses: $8,200.00\nNet Profit: $7,550.00",
      confidence: 0.92,
      processingTime: 55,
      language: "en",
      metadata: {
        pageCount: 3,
        imageWidth: 2480,
        imageHeight: 3508,
        dpi: 300,
        processingEngine: "Tesseract",
        processingVersion: "5.3.0",
      },
      createdAt: "2024-01-20T09:15:00Z",
    },
    thumbnailUrl: "/api/documents/doc-5/thumbnail",
    downloadUrl: "/api/documents/doc-5/download",
    uploadedBy: "user-1",
  },
];

// Mock processing jobs
export const mockProcessingJobs: ProcessingJob[] = [
  {
    id: "job-1",
    documentId: "doc-3",
    workspaceId: "ws-1",
    status: "running",
    progress: 65,
    startedAt: "2024-01-20T14:01:00Z",
    retryCount: 0,
    estimatedTimeRemaining: 25,
  },
  {
    id: "job-2",
    documentId: "doc-4",
    workspaceId: "ws-1",
    status: "failed",
    progress: 0,
    startedAt: "2024-01-20T13:31:00Z",
    completedAt: "2024-01-20T13:32:00Z",
    error: "Image quality too low for OCR processing",
    retryCount: 2,
  },
  {
    id: "job-3",
    documentId: "doc-6",
    workspaceId: "ws-1",
    status: "pending",
    progress: 0,
    startedAt: "2024-01-20T14:30:00Z",
    retryCount: 0,
  },
];

// Helper functions for mock data manipulation
export const generateMockDocument = (overrides: Partial<Document> = {}): Document => ({
  id: `doc-${Date.now()}`,
  workspaceId: "ws-1",
  filename: `document_${Date.now()}.pdf`,
  originalName: `Document ${Date.now()}.pdf`,
  fileSize: Math.random() * 5 * 1024 * 1024, // Random size up to 5MB
  mimeType: "application/pdf",
  uploadedAt: new Date().toISOString(),
  status: "uploading",
  thumbnailUrl: `/api/documents/doc-${Date.now()}/thumbnail`,
  downloadUrl: `/api/documents/doc-${Date.now()}/download`,
  uploadedBy: "user-1",
  ...overrides,
});

export const generateMockJob = (documentId: string, overrides: Partial<ProcessingJob> = {}): ProcessingJob => ({
  id: `job-${Date.now()}`,
  documentId,
  workspaceId: "ws-1",
  status: "pending",
  progress: 0,
  startedAt: new Date().toISOString(),
  retryCount: 0,
  ...overrides,
});

export const generateMockOCRResult = (documentId: string, overrides: Partial<OCRResult> = {}): OCRResult => ({
  id: `ocr-${Date.now()}`,
  documentId,
  extractedText: "Sample extracted text from OCR processing...",
  confidence: 0.85 + Math.random() * 0.15, // Random confidence between 0.85-1.0
  processingTime: 30 + Math.random() * 60, // Random time between 30-90 seconds
  language: "en",
  metadata: {
    pageCount: 1,
    imageWidth: 2480,
    imageHeight: 3508,
    dpi: 300,
    processingEngine: "Tesseract",
    processingVersion: "5.3.0",
  },
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Simulate API delays
export const simulateDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate API errors
export const simulateError = (probability: number = 0.1) => {
  if (Math.random() < probability) {
    throw new Error("Simulated API error");
  }
};
