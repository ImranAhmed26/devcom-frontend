"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { countryList } from "@/constants/AppConstants";
import ReactCountryFlag from "react-country-flag";

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(countryList[0]);

  useEffect(() => {
    const lang = countryList.find((l) => l.code === currentLocale);
    if (lang) setCurrentLanguage(lang);
  }, [currentLocale]);

  const handleLanguageChange = (newLocale: string) => {
    setOpen(false);
    if (newLocale !== currentLocale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="relative inline-block text-left text-sm w-32">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-black/10 dark:bg-gray-800 border-none rounded-medium hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none h-9 w-32"
      >
        <ReactCountryFlag
          countryCode={currentLanguage?.countryCode}
          svg
          style={{
            width: "1.25em",
            height: "1.25em",
            marginRight: "0.5em",
            verticalAlign: "middle",
          }}
          title={currentLanguage?.name}
        />
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <ChevronDown className="h-4 w-4 opacity-60 ml-auto" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-medium shadow-lg z-50 overflow-hidden">
          {countryList.map((lang, index) => {
            const isFirst = index === 0;
            const isLast = index === countryList.length - 1;

            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between gap-2 px-4 py-2 h-9 w-full hover:bg-gray-100 dark:hover:bg-gray-600
            ${isFirst ? "rounded-t-medium" : ""}
            ${isLast ? "rounded-b-medium" : ""}
            ${!isFirst && !isLast ? "rounded-none" : ""}
            ${currentLocale === lang.code ? "dark:bg-gray-700 bg-gray-100" : ""}
          `}
              >
                <div className="flex items-center">
                  <ReactCountryFlag
                    countryCode={lang.countryCode}
                    svg
                    style={{
                      width: "1.25em",
                      height: "1.25em",
                      marginRight: "0.5em",
                      verticalAlign: "middle",
                    }}
                    title={lang.name}
                  />
                  <span>{lang.name}</span>
                </div>
                {currentLocale === lang.code && <Check className="h-4 w-4 text-blue-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
