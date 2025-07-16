"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Download, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Documents",
    description: "Drag & drop invoices, receipts, or documents. Supports PDF, JPG, PNG formats.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "Our advanced OCR AI extracts, validates, and structures your data automatically.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Download,
    title: "Export Data",
    description: "Download structured JSON/CSV files or integrate directly with your systems.",
    color: "bg-purple-100 text-purple-600",
  },
];

const benefits = [
  "Reduce processing time by 95%",
  "Eliminate manual data entry errors",
  "Scale without hiring more staff",
  "Integrate with existing workflows",
  "Maintain full data security & compliance",
];

export function Solution() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors">
            <CheckCircle className="mr-1 h-3 w-3" />
            The Solution
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transform Documents in 3 Simple Steps</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform eliminates the manual work, giving your team back hours every day while ensuring perfect
            accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-blue-200 transition-colors">
                <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${step.color} mb-4`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Finance Teams Choose DocuMind</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Start Your Free Trial
            </button>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-gray-600 mb-4">Time Saved</div>
                <div className="h-2 bg-gray-200 rounded-full mb-6">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <div className="text-sm text-gray-600">
                  {`DocuMind reduced our invoice processing time from 4 hours to 12 minutes`}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
