import api from "./api";

// Test function to check API connectivity
export async function testApiConnection() {
  try {
    console.log("🧪 Testing API connection...");
    console.log("🧪 API Base URL:", process.env.NEXT_PUBLIC_API_URL);
    
    // Try a simple GET request to test connectivity
    const response = await api.get('/health');
    console.log("🧪 API Health Check Response:", response);
    return true;
  } catch (error) {
    console.error("🧪 API Connection Test Failed:", error);
    return false;
  }
}

// Mock registration for testing
export async function mockRegister(data: any) {
  console.log("🎭 Mock Registration Called with:", data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success response
  return {
    data: {
      user: {
        id: "mock-user-id",
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        role: "user" as const,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
    },
    status: 201,
    success: true,
    message: "Registration successful",
  };
}
// Mock workspaces data for testing
export async function mockGetWorkspaces() {
  console.log("🎭 Mock Get Workspaces Called");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock workspaces data
  const mockWorkspaces = [
    {
      id: "ws-1234-5678-9abc-def0",
      name: "Finance Documents",
      createdAt: "2025-01-15T10:30:00.000Z",
      updatedAt: "2025-01-20T14:45:00.000Z",
      userId: "84a4d67f-5345-4bd4-9556-831c81eb86e8",
      companyId: "22c7f430-ca80-4e3a-be04-5ce534b050b8",
      documentsCount: 25,
      jobsCount: 8
    },
    {
      id: "ws-2345-6789-bcde-f012",
      name: "Invoice Processing",
      createdAt: "2025-01-10T09:15:00.000Z",
      updatedAt: "2025-01-22T16:20:00.000Z",
      userId: "94b5e78g-6456-5ce5-a667-942d92fc97f9",
      companyId: "22c7f430-ca80-4e3a-be04-5ce534b050b8",
      documentsCount: 42,
      jobsCount: 15
    },
    {
      id: "ws-3456-789a-cdef-0123",
      name: "Receipt Archive",
      createdAt: "2025-01-05T11:00:00.000Z",
      updatedAt: "2025-01-18T13:30:00.000Z",
      userId: "a5c6f89h-7567-6df6-b778-a53ea3gd08ga",
      companyId: "33d8g541-db91-5f4b-cf15-6df645e161c9",
      documentsCount: 18,
      jobsCount: 3
    }
  ];
  
  return {
    data: mockWorkspaces,
    status: 200,
    success: true,
    message: "Workspaces fetched successfully",
  };
}