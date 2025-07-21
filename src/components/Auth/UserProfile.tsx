"use client";

import { useAuthUser } from "@/lib/hooks/useAuth";
import LogoutButton from "./LogoutButton";

interface UserProfileProps {
  showLogout?: boolean;
  className?: string;
}

export default function UserProfile({ showLogout = true, className = "flex items-center space-x-3" }: UserProfileProps) {
  const user = useAuthUser();

  if (!user) return null;

  return (
    <div className={className}>
      <div className="flex items-center space-x-3">
        {/* User Avatar */}
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <span className="text-sm font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
        </div>
      </div>

      {/* Logout Button */}
      {showLogout && <LogoutButton className="ml-4 text-sm text-red-600 hover:text-red-800">Logout</LogoutButton>}
    </div>
  );
}

// Compact version for navigation bars
export function UserProfileCompact() {
  const user = useAuthUser();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
        <span className="text-xs font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
    </div>
  );
}
