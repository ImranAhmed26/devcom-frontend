"use client";

import { motion } from "framer-motion";
import IllustrationSection from "./IllustrationSection";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="lg:min-h-[70dvh] flex items-center justify-center mt-6 lg:mt-6 lg:p-4 lg:my-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md sm:max-w-xl lg:max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row min-h-[500px] min-w-[350px]">
          <IllustrationSection />
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
}
