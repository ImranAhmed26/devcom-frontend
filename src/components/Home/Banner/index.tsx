"use client";

import React from "react";
import { motion } from "framer-motion";
import RoamingCards from "../RoamingCards";
import { containerVariants, itemVariants } from "@/components/Shared/FramerConsts";
import { HighlightWords } from "../../Interface/CustomFeature/HighlightedWords";
import H4 from "@/components/Interface/Typography/H4";
import ActionButton from "@/components/Interface/Button/ActionButton";
import AltButton from "@/components/Interface/Button/AltButton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
    <motion.div
      className="flex flex-col lg:flex-row items-center justify-between w-full lg:min-w-[80vw] h-[80vh] sm:px-4 px-8 py-12 lg:py-20 "
      variants={containerVariants()}
      initial="hidden"
      animate="visible"
    >
      {/* Left: Banner Content */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-6 h-full"
        variants={itemVariants()}
      >
        <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold" variants={itemVariants()}>
          {HighlightWords(title, highlightedWords)}
        </motion.h1>
        <motion.p
          className="max-w-2xl font-extralight text-xl sm:text-2xl text-brandLight dark:text-brandDark"
          variants={itemVariants()}
        >
          {subTitle}
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6" variants={itemVariants()}>
          <ActionButton title={actionTitle} func={() => handleStartBuilding(actionLink)} />
          <AltButton title={altTitle} func={() => handleStartBuilding(altLink)} />
        </motion.div>
        <motion.div className="pt-10 max-w-xl" variants={itemVariants()}>
          <H4 para={description} />
        </motion.div>
      </motion.div>

      {/* Right: Roaming Cards */}
      <motion.div className="w-full lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0" variants={itemVariants()}>
        <RoamingCards />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
