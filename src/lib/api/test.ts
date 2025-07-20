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