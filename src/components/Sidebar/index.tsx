"use client";

import { useState } from "react";
import { FileText, CreditCard, User, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { sideBarData } from "@/constants/AppConstants";
import clsx from "clsx";

const SidebarHeader = () => (
  <div className="h-16 px-4 py-2">
    <div className="flex items-center gap-2 py-2 px-2 rounded-medium dark:bg-pentaGray w-full">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brandLight text-white">
        <FileText className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">OCR Pro</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Text Recognition</p>
      </div>
    </div>
  </div>
);

const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => {
  const pathname = usePathname();

  return (
    <div className="flex-1 px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-wider mb-3">Navigation</p>
      <div className="space-y-1">
        {sideBarData.menuItems.map((item) => {
          const isActive = pathname === item.path || (pathname.startsWith(item.path + "/") && item.path !== "/app");

          return (
            <Link
              key={item.title}
              href={item.path}
              onClick={onItemClick}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-medium transition-colors",
                isActive
                  ? "bg-brandLight dark:bg-brandDark text-white dark:text-gray-800 font-medium"
                  : "hover:bg-gray-500 hover:text-white dark:hover:bg-hexaGray dark:hover:text-brandDark"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const SidebarFooter = ({ onItemClick }: { onItemClick?: () => void }) => (
  <div className="px-4 pt-4 pb-10 border-t border-gray-200 dark:border-gray-600 space-y-1">
    {[
      { icon: User, label: "Account", href: "user" },
      { icon: CreditCard, label: "499 Tokens Remaining", href: "#" },
    ].map(({ icon: Icon, label, href }) => (
      <a
        key={label}
        href={href}
        onClick={onItemClick}
        className="flex items-center gap-3 px-3 py-2 text-sm rounded-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-brandDark transition-colors"
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </a>
    ))}
  </div>
);

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button onClick={() => setIsOpen(true)} className="md:hidden p-2 rounded-md hover:text-gray-900 hover:bg-gray-100">
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-64 flex-col border-r border-gray-200 dark:border-gray-700 dark:bg-quadraGray">
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter />
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Mobile Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-black transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <SidebarHeader />
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <X className="h-5 w-5" />
          </button>
        </div>
        <SidebarNav onItemClick={() => setIsOpen(false)} />
        <SidebarFooter onItemClick={() => setIsOpen(false)} />
      </aside>
    </>
  );
}
