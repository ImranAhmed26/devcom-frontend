"use client";
import { motion } from "framer-motion";
import { FaRobot, FaShieldAlt, FaCloud, FaChartBar, FaCode, FaGlobe } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="w-8 h-8 text-blue-500" />,
    title: "Advanced AI Recognition",
    description: "99%+ accuracy in data extraction from various document formats using state-of-the-art OCR technology."
  },
  {
    icon: <FaShieldAlt className="w-8 h-8 text-green-500" />,
    title: "GDPR Compliant",
    description: "Enterprise-grade security with EU data centers and full GDPR compliance for data protection."
  },
  {
    icon: <FaCloud className="w-8 h-8 text-purple-500" />,
    title: "Cloud Processing",
    description: "Process thousands of documents simultaneously with our scalable cloud infrastructure."
  },
  {
    icon: <FaChartBar className="w-8 h-8 text-orange-500" />,
    title: "Analytics Dashboard",
    description: "Real-time insights into your document processing with detailed analytics and reporting."
  },
  {
    icon: <FaCode className="w-8 h-8 text-red-500" />,
    title: "API Integration",
    description: "Easy integration with your existing systems through our comprehensive REST API."
  },
  {
    icon: <FaGlobe className="w-8 h-8 text-teal-500" />,
    title: "Multi-Language Support",
    description: "Process documents in multiple languages with automatic language detection."
  }
];

const Features = () => {
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
            Powerful Features for Your Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Everything you need for efficient document processing
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
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

export default Features;