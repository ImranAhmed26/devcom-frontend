"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      className="p-1.5 rounded-full text-white  bg-brandLight  hover:bg-brandDark hover:text-blue-900 dark:text-blue-900 dark:hover:text-white dark:bg-brandDark dark:hover:bg-brandLight "
      onClick={() => setTheme(isDark ? "light" : "dark")}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </motion.button>
  );
}
