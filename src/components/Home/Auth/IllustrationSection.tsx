import { motion } from "framer-motion";
import ASSET from "../../../../public/assets/asset-02.png";

export default function IllustrationSection() {
  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-100 to-violet-100 p-2 lg:px-2 flex flex-col justify-between relative overflow-hidden">
      {/* Floating Animation Elements */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-10 w-6 h-6 lg:w-8 lg:h-8 bg-violet-100 rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-4 lg:top-32 right-20 w-5 h-5 lg:w-6 lg:h-6 bg-indigo-600 rounded-full opacity-50"
      />
      {/* Main Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex items-center justify-center"
      >
        <img
          src={ASSET.src}
          alt="Student studying"
          className="w-full rounded-2xl h-36 sm:h-40 object-cover object-[0_18%] lg:h-auto lg:object-contain"
        />
      </motion.div>
    </div>
  );
}
