"use client";

import { useAuth } from "@/lib/hooks/useAuth";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className = "text-red-600 hover:text-red-800 transition-colors",
  children = "Logout",
}: LogoutButtonProps) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  if (!user) return null;

  return (
    <button onClick={handleLogout} className={className} type="button">
      {children}
    </button>
  );
}

// Simple logout hook for custom implementations
export function useLogout() {
  const { logout } = useAuth();

  return {
    logout: () => {
      if (confirm("Are you sure you want to logout?")) {
        logout();
      }
    },
    logoutWithoutConfirm: logout,
  };
}
