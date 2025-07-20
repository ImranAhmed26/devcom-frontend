"use client";

import { motion } from "framer-motion";
import { Clock, AlertCircle, DollarSign, Users } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    title: "Hours Lost Daily",
    description: "Your team spends 3-4 hours every day manually extracting data from invoices and receipts.",
    stat: "40%",
    statLabel: "of finance time wasted",
  },
  {
    icon: AlertCircle,
    title: "Human Errors",
    description: "Manual data entry leads to costly mistakes, delayed payments, and compliance issues.",
    stat: "23%",
    statLabel: "error rate in manual entry",
  },
  {
    icon: DollarSign,
    title: "Hidden Costs",
    description: "Processing costs spiral as your business grows, requiring more staff and resources.",
    stat: "$50K+",
    statLabel: "annual processing costs",
  },
  {
    icon: Users,
    title: "Team Frustration",
    description: "Talented professionals stuck doing repetitive work instead of strategic analysis.",
    stat: "65%",
    statLabel: "want to automate tasks",
  },
];

export default function PainPoints() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Hidden Cost of Manual Document Processing</h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-600">
            Every day, finance teams across Europe and the US face the same exhausting challenges. Sound familiar?
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileTap={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="cursor-pointer shadow-md rounded-2xl bg-gray-50 dark:bg-hexaGray backdrop--2xl px-5 py-5 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="">
                <div className="flex items-center justify-between mb-4">
                  <point.icon className="h-7 w-7 sm:h-8 sm:w-8 text-red-500" />
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">{point.stat}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{point.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{point.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-500">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-red-50 dark:bg-red-950/90 rounded-2xl p-6 sm:p-8 max-w-xl sm:max-w-3xl mx-auto drop-shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-300 mb-3 sm:mb-4">
              The Real Question Is: How Much Is This Costing You?
            </h3>
            <p className="text-red-800 dark:text-red-50 text-sm sm:text-base">
              A mid-sized company processing 500 documents monthly loses approximately
              <span className="font-bold"> €120,000 annually</span> in inefficiencies, errors, and missed opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
