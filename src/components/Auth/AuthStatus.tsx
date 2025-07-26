"use client";

import { useAuth } from "@/lib/auth/authStore";
import { useEffect, useState } from "react";
import { authEvents, type AuthEvent } from "@/lib/auth/authEvents";

export function AuthStatus() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [lastEvent, setLastEvent] = useState<AuthEvent | null>(null);

  useEffect(() => {
    const unsubscribe = authEvents.subscribe((event) => {
      setLastEvent(event);
    });

    return unsubscribe;
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-lg text-xs max-w-xs z-50">
      <div className="font-semibold mb-1">🔐 Auth Status</div>
      <div>Loading: {isLoading ? "✅" : "❌"}</div>
      <div>Authenticated: {isAuthenticated ? "✅" : "❌"}</div>
      <div>User: {user?.name || "None"}</div>
      {lastEvent && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="font-semibold">Last Event:</div>
          <div>{lastEvent.type}</div>
          {lastEvent.message && <div className="text-gray-300">{lastEvent.message}</div>}
        </div>
      )}
    </div>
  );
}
