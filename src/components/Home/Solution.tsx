"use client";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaCogs, FaFileAlt, FaChartLine } from "react-icons/fa";

const steps = [
  {
    icon: <FaCloudUploadAlt className="w-8 h-8 text-blue-500" />,
    title: "Upload Documents",
    description: "Simply drag & drop your invoices, receipts, or documents. Batch upload supported."
  },
  {
    icon: <FaCogs className="w-8 h-8 text-purple-500" />,
    title: "AI Processing",
    description: "Our advanced AI extracts and structures data with industry-leading accuracy."
  },
  {
    icon: <FaFileAlt className="w-8 h-8 text-green-500" />,
    title: "Get Structured Data",
    description: "Receive clean JSON/CSV data, ready for your financial systems."
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-orange-500" />,
    title: "Analyze & Export",
    description: "Review extracted data, generate reports, and export to your preferred format."
  }
];

const Solution = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Transform your document processing workflow in four simple steps
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;