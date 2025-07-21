"use client";
import { useTranslations } from "next-intl";
import ThemeSwitch from "../Interface/CustomFeature/ThemeSwitch";
import LanguageDropdown from "../Interface/CustomFeature/LanguageSwitch";
import { useAuthStore } from "@/lib/auth/authStore";
import React from "react";

const AppNavbar = () => {
  const t = useTranslations("home");
  const { user, logout } = useAuthStore();

  return (
    <header className="flex justify-between h-16 items-center gap-4 border-b border-gray-200 dark:border-none bg-white dark:bg-quadraGray px-4">
      <div className="flex items-center">
        <div className="h-4 w-px bg-gray-300 mx-2" />
        <h1 className="text-lg font-semibold">{t("title")}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* User info */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <LanguageDropdown />
          <ThemeSwitch />

          {/* Logout button */}
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
