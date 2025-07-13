"use client";
import { useTranslations } from "next-intl";
import ThemeSwitch from "../Interface/CustomFeature/ThemeSwitch";

import React from "react";
import LanguageDropdown from "../Shared/LanguageSwitch";

const AppNavbar = () => {
  const t = useTranslations("home");
  return (
    <header className="flex justify-between h-16 items-center gap-4 border-b border-gray-200 dark:border-none bg-white dark:bg-quadraGray px-4">
      <div className="flex items-center">
        <div className="h-4 w-px bg-gray-300 mx-2" />
        <h1 className="text-lg font-semibold">{t("title")}</h1>
      </div>
      <div>
        <div className="w-20 lg:px-3 py-2.5 lg:flex justify-end">
          <ThemeSwitch />
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
