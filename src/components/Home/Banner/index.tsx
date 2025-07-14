"use client";

import React from "react";
import { motion } from "framer-motion";
import RoamingCards from "./RoamingCards";
import { containerVariants, itemVariants } from "@/components/Shared/FramerConsts";
import { HighlightWords } from "../../Interface/CustomFeature/HighlightedWords";
import H4 from "@/components/Interface/Typography/H4";
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
    <motion.div className="flex flex-col justify-center items-center min-h-[80vh] ">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between w-full lg:min-w-[70vw] sm:px-4 px-8 py-8"
        variants={containerVariants()}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Banner Content */}
        <motion.div
          className="w-full lg:w-2/3 flex flex-col items-center justify-center text-center gap-6 h-full"
          variants={itemVariants()}
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors">
            <Zap className="mr-1 h-3 w-3" />
            AI-Powered Document Processing
          </div>
          <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold" variants={itemVariants()}>
            {HighlightWords(title, highlightedWords)}
          </motion.h1>
          <motion.p
            className="max-w-2xl font-extralight text-xl sm:text-2xl text-brandLight dark:text-brandDark"
            variants={itemVariants()}
          >
            {subTitle}
          </motion.p>
          <motion.div className="mt-0 flex items-center justify-center gap-8 text-sm text-gray-500" variants={itemVariants()}>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Setup in 5 minutes</span>
            </div>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6" variants={itemVariants()}>
            <ActionButton title={actionTitle} func={() => handleStartBuilding(actionLink)} />
            <AltButton title={altTitle} func={() => handleStartBuilding(altLink)} />
          </motion.div>
        </motion.div>

        {/* Right: Roaming Cards */}
        <motion.div className="w-full lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0" variants={itemVariants()}>
          <RoamingCards />
        </motion.div>
      </motion.div>
      <motion.p
        className="max-w-5xl font-extralight text-xl sm:text-xl text-brandLight dark:text-brandDark text-center"
        variants={itemVariants()}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default Banner;
