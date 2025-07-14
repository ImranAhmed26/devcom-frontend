"use client";
import { motion } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";

const painPoints = [
  {
    title: "Manual Data Entry Burden",
    description: "Hours wasted on manual data entry from invoices and receipts, leading to delays and errors."
  },
  {
    title: "Costly Processing Errors",
    description: "Human errors in data entry result in payment delays, compliance issues, and financial discrepancies."
  },
  {
    title: "Document Management Chaos",
    description: "Scattered documents across emails, drives, and physical storage create inefficient workflows."
  },
  {
    title: "Compliance Risk Exposure",
    description: "Manual processes increase the risk of non-compliance with tax regulations and audit requirements."
  }
];

const PainPoints = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Common Challenges in Document Processing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Are these pain points familiar to your business?
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <FaExclamationCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;