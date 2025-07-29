// Individual Workspace API functions
// Currently using mock data - will be replaced with real API calls

import type { ApiResponse } from "@/lib/api/api";
import type {
  Workspace,
  Document,
  OCRResult,
  ProcessingJob,
  PaginatedResponse,
  GetDocumentsParams,
  UploadDocumentRequest,
  UpdateWorkspaceRequest,
  ExportRequest,
} from "../types";

import {
  mockWorkspace,
  mockDocuments,
  mockOCRResults,
  mockProcessingJobs,
  generateMockDocument,
  generateMockJob,
  simulateDelay,
  simulateError,
} from "./mockData";

// Individual Workspace API Functions
export const individualWorkspaceApi = {
  // Get workspace details by ID using workspace/id endpoint
  getWorkspaceDetails: async (workspaceId: string): Promise<ApiResponse<Workspace>> => {
    console.log(`🏢 [Individual Workspace API] Fetching workspace details from workspace/${workspaceId}`);

    await simulateDelay(300);
    simulateError(0.05); // 5% chance of error

    // TODO: Replace with actual API call to workspace/{workspaceId} endpoint
    // Example implementation:
    // try {
    //   const response = await fetch(`/api/workspace/${workspaceId}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     },
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   throw new Error(`Failed to fetch workspace: ${error.message}`);
    // }

    // For demo purposes, return mock workspace with the requested ID
    // In real implementation, this data would come from the API response
    const workspace = {
      ...mockWorkspace,
      id: workspaceId,
      // Use the original mock workspace name instead of showing the ID
      name: mockWorkspace.name,
      description: mockWorkspace.description,
    };

    return {
      data: workspace,
      success: true,
      status: 200,
      message: "Workspace details retrieved successfully",
    };
  },

  // Get documents in workspace with pagination and filtering
  getWorkspaceDocuments: async (params: GetDocumentsParams): Promise<ApiResponse<PaginatedResponse<Document>>> => {
    console.log(
      `🏢 [Individual Workspace API] Fetching documents from workspace/${params.workspaceId}/documents with params:`,
      params
    );

    await simulateDelay(400);
    simulateError(0.03); // 3% chance of error

    // TODO: Replace with actual API call to workspace/{workspaceId}/documents endpoint
    // Example: GET /api/workspace/{workspaceId}/documents?page=1&limit=20&filters=...

    // Update mock documents to use the requested workspace ID
    let filteredDocuments = mockDocuments.map((doc) => ({
      ...doc,
      workspaceId: params.workspaceId,
    }));

    // Apply filters
    if (params.filters?.status?.length) {
      filteredDocuments = filteredDocuments.filter((doc) => params.filters!.status!.includes(doc.status));
    }

    if (params.filters?.fileTypes?.length) {
      filteredDocuments = filteredDocuments.filter((doc) => params.filters!.fileTypes!.includes(doc.mimeType));
    }

    if (params.filters?.dateRange) {
      const start = new Date(params.filters.dateRange.start);
      const end = new Date(params.filters.dateRange.end);
      filteredDocuments = filteredDocuments.filter((doc) => {
        const docDate = new Date(doc.uploadedAt);
        return docDate >= start && docDate <= end;
      });
    }

    // Apply search
    if (params.search?.query) {
      const query = params.search.query.toLowerCase();
      filteredDocuments = filteredDocuments.filter((doc) => {
        if (params.search!.searchIn.includes("filename") && doc.filename.toLowerCase().includes(query)) {
          return true;
        }
        if (params.search!.searchIn.includes("content") && doc.ocrResults?.extractedText.toLowerCase().includes(query)) {
          return true;
        }
        return false;
      });
    }

    // Apply sorting
    if (params.sort) {
      filteredDocuments.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (params.sort!.field) {
          case "name":
            aValue = a.filename.toLowerCase();
            bValue = b.filename.toLowerCase();
            break;
          case "date":
            aValue = new Date(a.uploadedAt);
            bValue = new Date(b.uploadedAt);
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          case "confidence":
            aValue = a.ocrResults?.confidence || 0;
            bValue = b.ocrResults?.confidence || 0;
            break;
          case "size":
            aValue = a.fileSize;
            bValue = b.fileSize;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return params.sort!.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return params.sort!.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

    return {
      data: {
        data: paginatedDocuments,
        total: filteredDocuments.length,
        page,
        limit,
        totalPages: Math.ceil(filteredDocuments.length / limit),
      },
      success: true,
      status: 200,
      message: "Documents retrieved successfully",
    };
  },

  // Get document by ID
  getDocument: async (documentId: string): Promise<ApiResponse<Document>> => {
    console.log(`🏢 [Individual Workspace API] Fetching document ${documentId}`);

    await simulateDelay(200);
    simulateError(0.02);

    const document = mockDocuments.find((doc) => doc.id === documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    return {
      data: document,
      success: true,
      status: 200,
      message: "Document retrieved successfully",
    };
  },

  // Get OCR results for a document
  getOCRResults: async (documentId: string): Promise<ApiResponse<OCRResult>> => {
    console.log(`🏢 [Individual Workspace API] Fetching OCR results for document ${documentId}`);

    await simulateDelay(300);
    simulateError(0.02);

    const ocrResult = mockOCRResults.find((result) => result.documentId === documentId);
    if (!ocrResult) {
      throw new Error("OCR results not found");
    }

    return {
      data: ocrResult,
      success: true,
      status: 200,
      message: "OCR results retrieved successfully",
    };
  },

  // Upload documents to workspace
  uploadDocuments: async (request: UploadDocumentRequest): Promise<ApiResponse<Document[]>> => {
    console.log(
      `🏢 [Individual Workspace API] Uploading ${request.files.length} files to workspace/${request.workspaceId}/documents`
    );

    await simulateDelay(1000); // Longer delay for upload simulation
    simulateError(0.05);

    // TODO: Replace with actual API call to workspace/{workspaceId}/documents endpoint
    // Example: POST /api/workspace/{workspaceId}/documents with FormData

    const uploadedDocuments: Document[] = [];

    for (const file of request.files) {
      const document = generateMockDocument({
        workspaceId: request.workspaceId,
        filename: file.name.replace(/[^a-zA-Z0-9.-]/g, "_"),
        originalName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        status: request.autoProcess ? "queued" : "completed",
      });

      uploadedDocuments.push(document);

      // If auto-process is enabled, create a processing job
      if (request.autoProcess) {
        const job = generateMockJob(document.id, {
          status: "pending",
        });
        mockProcessingJobs.push(job);
      }
    }

    // Add to mock data
    mockDocuments.unshift(...uploadedDocuments);

    return {
      data: uploadedDocuments,
      success: true,
      status: 201,
      message: `${uploadedDocuments.length} documents uploaded successfully`,
    };
  },

  // Delete document
  deleteDocument: async (documentId: string): Promise<ApiResponse<{ message: string }>> => {
    console.log(`🏢 [Individual Workspace API] Deleting document ${documentId}`);

    await simulateDelay(300);
    simulateError(0.02);

    const index = mockDocuments.findIndex((doc) => doc.id === documentId);
    if (index === -1) {
      throw new Error("Document not found");
    }

    mockDocuments.splice(index, 1);

    // Also remove any associated OCR results and jobs
    const ocrIndex = mockOCRResults.findIndex((result) => result.documentId === documentId);
    if (ocrIndex !== -1) {
      mockOCRResults.splice(ocrIndex, 1);
    }

    const jobIndex = mockProcessingJobs.findIndex((job) => job.documentId === documentId);
    if (jobIndex !== -1) {
      mockProcessingJobs.splice(jobIndex, 1);
    }

    return {
      data: { message: "Document deleted successfully" },
      success: true,
      status: 200,
      message: "Document deleted successfully",
    };
  },

  // Update workspace
  updateWorkspace: async (workspaceId: string, updates: UpdateWorkspaceRequest): Promise<ApiResponse<Workspace>> => {
    console.log(`🏢 [Individual Workspace API] Updating workspace/${workspaceId}:`, updates);

    await simulateDelay(400);
    simulateError(0.03);

    // TODO: Replace with actual API call to workspace/{workspaceId} endpoint
    // Example: PUT /api/workspace/{workspaceId}

    // Create updated workspace with the requested ID
    const updatedWorkspace: Workspace = {
      ...mockWorkspace,
      ...updates,
      id: workspaceId,
      settings: {
        ...mockWorkspace.settings,
        ...updates.settings,
      },
      updatedAt: new Date().toISOString(),
    };

    return {
      data: updatedWorkspace,
      success: true,
      status: 200,
      message: "Workspace updated successfully",
    };
  },

  // Get processing jobs for workspace
  getProcessingJobs: async (workspaceId: string): Promise<ApiResponse<ProcessingJob[]>> => {
    console.log(`🏢 [Individual Workspace API] Fetching processing jobs from workspace/${workspaceId}/jobs`);

    await simulateDelay(200);
    simulateError(0.02);

    // TODO: Replace with actual API call to workspace/{workspaceId}/jobs endpoint
    // Example: GET /api/workspace/{workspaceId}/jobs

    // Update mock jobs to use the requested workspace ID
    const jobs = mockProcessingJobs.map((job) => ({
      ...job,
      workspaceId: workspaceId,
    }));

    return {
      data: jobs,
      success: true,
      status: 200,
      message: "Processing jobs retrieved successfully",
    };
  },

  // Cancel processing job
  cancelJob: async (jobId: string): Promise<ApiResponse<{ message: string }>> => {
    console.log(`🏢 [Individual Workspace API] Cancelling job ${jobId}`);

    await simulateDelay(200);
    simulateError(0.02);

    const job = mockProcessingJobs.find((j) => j.id === jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    if (job.status === "completed" || job.status === "failed") {
      throw new Error("Cannot cancel completed or failed job");
    }

    job.status = "cancelled";
    job.completedAt = new Date().toISOString();

    return {
      data: { message: "Job cancelled successfully" },
      success: true,
      status: 200,
      message: "Job cancelled successfully",
    };
  },

  // Retry failed job
  retryJob: async (jobId: string): Promise<ApiResponse<ProcessingJob>> => {
    console.log(`🏢 [Individual Workspace API] Retrying job ${jobId}`);

    await simulateDelay(300);
    simulateError(0.03);

    const job = mockProcessingJobs.find((j) => j.id === jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    if (job.status !== "failed") {
      throw new Error("Can only retry failed jobs");
    }

    job.status = "pending";
    job.progress = 0;
    job.retryCount += 1;
    job.startedAt = new Date().toISOString();
    job.completedAt = undefined;
    job.error = undefined;

    return {
      data: job,
      success: true,
      status: 200,
      message: "Job retry initiated successfully",
    };
  },

  // Reprocess document
  reprocessDocument: async (documentId: string): Promise<ApiResponse<ProcessingJob>> => {
    console.log(`🏢 [Individual Workspace API] Reprocessing document ${documentId}`);

    await simulateDelay(300);
    simulateError(0.03);

    const document = mockDocuments.find((doc) => doc.id === documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    // Create new processing job
    const job = generateMockJob(documentId, {
      status: "pending",
    });

    mockProcessingJobs.push(job);

    // Update document status
    document.status = "queued";
    document.processingJobId = job.id;

    return {
      data: job,
      success: true,
      status: 201,
      message: "Document reprocessing initiated successfully",
    };
  },

  // Export documents
  exportDocuments: async (request: ExportRequest): Promise<ApiResponse<{ downloadUrl: string }>> => {
    console.log("🏢 [Individual Workspace API] Exporting documents:", request);

    await simulateDelay(800); // Longer delay for export
    simulateError(0.05);

    // In real implementation, this would generate the export file and return download URL
    const exportId = `export-${Date.now()}`;
    const downloadUrl = `/api/exports/${exportId}/download`;

    return {
      data: { downloadUrl },
      success: true,
      status: 200,
      message: `${request.documentIds.length} documents exported successfully`,
    };
  },

  // Update OCR results (for text editing)
  updateOCRResults: async (documentId: string, extractedText: string): Promise<ApiResponse<OCRResult>> => {
    console.log(`🏢 [Individual Workspace API] Updating OCR results for document ${documentId}`);

    await simulateDelay(200);
    simulateError(0.02);

    const ocrResult = mockOCRResults.find((result) => result.documentId === documentId);
    if (!ocrResult) {
      throw new Error("OCR results not found");
    }

    ocrResult.editedText = extractedText;
    ocrResult.lastEditedAt = new Date().toISOString();
    ocrResult.lastEditedBy = "user-1"; // In real app, get from auth context

    return {
      data: ocrResult,
      success: true,
      status: 200,
      message: "OCR results updated successfully",
    };
  },
};

export default individualWorkspaceApi;
