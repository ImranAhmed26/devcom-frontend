"use client";
import React, { JSX, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { BANNER_DATA } from "@/constants/landingPage";
import { FaFileInvoiceDollar, FaFileAlt, FaCloudUploadAlt } from "react-icons/fa";

const RoamingCards = () => {
  const ICON_MAP: Record<string, JSX.Element> = {
    invoice: <FaFileInvoiceDollar className="text-indigo-600" size={28} />,
    file: <FaFileAlt className="text-red-600" size={28} />,
    cloud: <FaCloudUploadAlt className="text-teal-600" size={28} />,
  };

  return (
    <div className="relative w-full h-[600px] z-0">
      {BANNER_DATA.miniFloatingCardsData.map((card) => {
        const controls = useAnimation();
        const xRef = useRef(0);
        const yRef = useRef(0);

        useEffect(() => {
          controls.start({
            x: [card.animate.x[0], card.animate.x[1], card.animate.x[2]],
            y: [card.animate.y[0], card.animate.y[1], card.animate.y[2]],
            transition: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          });
        }, [controls]);

        return (
          <motion.div
            key={card.title}
            drag
            dragElastic={0.5}
            dragMomentum={false}
            onDragEnd={(e, info) => {
              xRef.current += info.offset.x;
              yRef.current += info.offset.y;
              controls.start({
                x: [xRef.current, xRef.current - 20, xRef.current],
                y: [yRef.current, yRef.current + 4, yRef.current],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              });
            }}
            animate={controls}
            className={`cursor-pointer absolute shadow-lg rounded-2xl ${card.bg}  backdrop-blur-md px-5 py-4 min-w-[300px] max-w-[320px] pointer-events-auto border border-white/20 dark:border-gray-700/20`}
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              top: card.initial.top,
              left: card.initial.left,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              {ICON_MAP[card.name]}
              <span className="font-semibold text-brandLight dark:text-brandDark text-base">{card.title}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300">{card.description}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RoamingCards;
