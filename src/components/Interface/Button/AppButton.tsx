"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const AppButton = ({ children, icon, href, onClick, className = "", type = "button" }: IconButtonProps) => {
  const content = (
    <span
      className={
        "inline-flex items-center px-3 py-1.5 text-sm font-medium text-white dark:text-gray-800 bg-brandLight hover:bg-brandDark dark:bg-brandDark dark:hover:bg-brandLight rounded-small" +
        className
      }
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      {children}
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
};
