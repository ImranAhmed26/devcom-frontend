"use client";
import React, { JSX, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaFileInvoiceDollar, FaFileAlt, FaCloudUploadAlt } from "react-icons/fa";

// ✅ Full data moved here (with colors, icons, and mobile initial positions)
const miniFloatingCardsData: {
  title: string;
  description: string;
  name: string;
  color: string;
  icon: JSX.Element;
  initial: { top: string; left: string };
  mobileInitial: { top: string; left: string };
  animate: { x: number[]; y: number[] };
}[] = [
  {
    title: "Accurate Invoice Extraction",
    description: "Save time with automatic, precise data capture from invoices and receipts.",
    name: "invoice",
    color: "bg-indigo-50 dark:bg-indigo-900/40",
    icon: <FaFileInvoiceDollar className="text-indigo-600" size={28} />,
    initial: { top: "15%", left: "30%" },
    mobileInitial: { top: "0%", left: "0%" },
    animate: { x: [0, 10, 0], y: [0, 2, 0] },
  },
  {
    title: "Supports Multiple Formats",
    description: "Upload PDFs, photos, scans, and get reliable data extraction every time.",
    name: "file",
    color: "bg-red-50 dark:bg-red-900/40",
    icon: <FaFileAlt className="text-red-600" size={28} />,
    initial: { top: "34%", left: "32%" },
    mobileInitial: { top: "35%", left: "0%" },
    animate: { x: [0, -20, 0], y: [0, 4, 0] },
  },
  {
    title: "Cloud-Based Processing",
    description: "Upload and process documents securely from anywhere—no setup required.",
    name: "cloud",
    color: "bg-teal-50 dark:bg-teal-900/40",
    icon: <FaCloudUploadAlt className="text-teal-600" size={28} />,
    initial: { top: "53%", left: "31%" },
    mobileInitial: { top: "70%", left: "0%" },
    animate: { x: [0, 10, 0], y: [0, 2, 0] },
  },
];

// ✅ Roaming Card Component
const RoamingCard = ({ card, isMobile }: { card: (typeof miniFloatingCardsData)[0]; isMobile: boolean }) => {
  const controls = useAnimation();
  const xRef = useRef(0);
  const yRef = useRef(0);

  useEffect(() => {
    controls.start({
      x: card.animate.x,
      y: card.animate.y,
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls, card.animate.x, card.animate.y]);

  return (
    <motion.div
      drag
      dragElastic={0.5}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        xRef.current += info.offset.x;
        yRef.current += info.offset.y;
        controls.start({
          x: [xRef.current, xRef.current - (isMobile ? 1 : 20), xRef.current],
          y: [yRef.current, yRef.current + 40, yRef.current],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        });
      }}
      animate={controls}
      className={`cursor-pointer absolute shadow-lg rounded-2xl ${card.color} backdrop-blur-md px-5 py-4 min-w-[300px] max-w-[320px] pointer-events-auto border border-white/20 dark:border-gray-700/20 sm:left-auto left-0`}
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        top: isMobile ? card.mobileInitial.top : card.initial.top,
        left: isMobile ? card.mobileInitial.left : card.initial.left,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        {card.icon}
        <span className="font-semibold text-brandLight dark:text-brandDark text-base">{card.title}</span>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-300">{card.description}</div>
    </motion.div>
  );
};

// ✅ Parent Component
const RoamingCards = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`relative w-full ${isMobile ? "h-[320px]" : "h-[600px]"}  z-0`}>
      {miniFloatingCardsData.map((card) => (
        <RoamingCard key={card.title} card={card} isMobile={isMobile} />
      ))}
    </div>
  );
};

export default RoamingCards;
