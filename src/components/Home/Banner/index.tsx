"use client";

import React from "react";
import { motion } from "framer-motion";
import RoamingCards from "./RoamingCards";
import { containerVariants, itemVariants } from "@/components/Shared/FramerConsts";
import { HighlightWords } from "../../Interface/CustomFeature/HighlightedWords";
import ActionButton from "@/components/Interface/Button/ActionButton";
import AltButton from "@/components/Interface/Button/AltButton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FileText, Shield, Zap } from "lucide-react";

const Banner = () => {
  const router = useRouter();
  const t = useTranslations("landing.banner");

  const handleStartBuilding = (link: string) => {
    router.push(link);
  };

  const title = t.raw("title");
  const highlightedWords = t.raw("highlightedWords") as string[];
  const subTitle = t("subTitle");
  const description = t("description");
  const actionTitle = t("button.action.title");
  const actionLink = t("button.action.link");
  const altTitle = t("button.alt.title");
  const altLink = t("button.alt.link");

  return (
    <motion.div className="flex flex-col justify-center items-center min-h-[80vh] px-4 sm:px-6">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl py-8 lg:py-12 gap-8 lg:gap-0"
        variants={containerVariants()}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Banner Content */}
        <motion.div
          className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 sm:gap-4"
          variants={itemVariants()}
        >
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors">
            <Zap className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            AI-Powered Document Processing
          </div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2 font-extrabold leading-snug sm:leading-tight"
            variants={itemVariants()}
          >
            {HighlightWords(title, highlightedWords)}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-2xl font-light sm:font-extralight text-lg sm:text-xl md:text-2xl text-brandLight dark:text-brandDark"
            variants={itemVariants()}
          >
            {subTitle}
          </motion.p>

          {/* Feature Badges */}
          <motion.div
            className="mt-2 sm:mt-0 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-gray-500"
            variants={itemVariants()}
          >
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Setup in 5 minutes</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 pt-4 sm:pt-6"
            variants={itemVariants()}
          >
            <ActionButton title={actionTitle} func={() => handleStartBuilding(actionLink)} />
            <AltButton title={altTitle} func={() => handleStartBuilding(altLink)} />
          </motion.div>
        </motion.div>

        {/* Right: Roaming Cards */}
        <motion.div className="w-full lg:w-1/2 flex items-center justify-center sm:mt-6 lg:mt-0" variants={itemVariants()}>
          <RoamingCards />
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="max-w-3xl sm:max-w-5xl font-light sm:font-extralight text-base sm:text-lg md:text-xl text-brandLight dark:text-brandDark text-center mt-4 sm:mt-6 px-2"
        variants={itemVariants()}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default Banner;
