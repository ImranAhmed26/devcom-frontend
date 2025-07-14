"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How accurate is your OCR technology?",
    answer: "Our AI-powered OCR achieves 99%+ accuracy for standard documents and 95%+ for complex layouts. We continuously train our models on diverse document types to ensure high accuracy across different formats and languages."
  },
  {
    question: "Is my data secure and GDPR compliant?",
    answer: "Yes, we take data security seriously. All data is processed in EU-based data centers, encrypted in transit and at rest, and automatically deleted according to your retention settings. We are fully GDPR compliant and can sign DPAs as needed."
  },
  {
    question: "How quickly can I get started?",
    answer: "You can start processing documents within minutes of signing up. Our platform requires no installation - simply upload your documents through our web interface or API. We offer a 14-day free trial with no credit card required."
  },
  {
    question: "What types of documents do you support?",
    answer: "We support a wide range of documents including invoices, receipts, purchase orders, shipping documents, and general business documents. Our system handles various formats including PDF, JPEG, PNG, and TIFF files."
  },
  {
    question: "Can I integrate with my existing systems?",
    answer: "Yes, we provide a comprehensive REST API and webhooks for seamless integration with your existing systems. We also offer pre-built integrations with popular accounting and ERP systems."
  },
  {
    question: "What happens if there's an error in the extraction?",
    answer: "Our platform includes a built-in verification interface where you can review and correct any extraction errors. We also provide confidence scores for each extracted field to help identify potential issues."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Everything you need to know about our service
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
              >
                <span className="text-left text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded-b-lg border-x border-b border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;