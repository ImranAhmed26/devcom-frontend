"use client";

import { useAuthStore } from "@/lib/auth/authStore";

export default function AuthStatus() {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  if (isLoading) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800">Loading authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800">Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
      <h3 className="text-green-800 font-medium mb-2">Authenticated User</h3>
      <div className="text-sm text-green-700 space-y-1">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
        {user?.companyName && (
          <p>
            <strong>Company:</strong> {user.companyName}
          </p>
        )}
      </div>
      <button
        onClick={logout}
        className="mt-3 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
