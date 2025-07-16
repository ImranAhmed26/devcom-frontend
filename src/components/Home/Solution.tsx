"use client";
import { Upload, Brain, Download, CheckCircle } from "lucide-react";

const steps = [
  // {
  //   icon: <FaCloudUploadAlt className="w-8 h-8 text-blue-500" />,
  //   title: "Upload Documents",
  //   description: "Simply drag & drop your invoices, receipts, or documents. Batch upload supported.",
  // },
  // {
  //   icon: <FaCogs className="w-8 h-8 text-purple-500" />,
  //   title: "AI Processing",
  //   description: "Our advanced AI extracts and structures data with industry-leading accuracy.",
  // },
  // {
  //   icon: <FaFileAlt className="w-8 h-8 text-green-500" />,
  //   title: "Get Structured Data",
  //   description: "Receive clean JSON/CSV data, ready for your financial systems.",
  // },
  // {
  //   icon: <FaChartLine className="w-8 h-8 text-orange-500" />,
  //   title: "Analyze & Export",
  //   description: "Review extracted data, generate reports, and export to your preferred format.",
  // },
  {
    icon: Upload,
    title: "Upload Documents",
    description: "Simply Drag & drop invoices, receipts, or any document. We support PDF, JPG, PNG formats.",
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "Our advanced AI extracts and structures data with industry-leading accuracy.",
  },
  {
    icon: Download,
    title: "Get Structured Data",
    description: "Download clean JSON/CSV data ready for your accounting software or ERP system.",
  },
  // {
  //   icon: CheckCircle,
  //   title: "Integrate & Automate",
  //   description: "Connect via API or use our integrations with QuickBooks, SAP, and other platforms.",
  // },
];

const Solution = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors">
            <CheckCircle className="mr-1 h-3 w-3" />
            The Solution
          </div>
          <h2 className="text-3xl font-bold text-brandLight dark:text-brandDark mb-4">Transform Documents in 3 Simple Steps</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform eliminates the manual work, giving your team back hours every day while ensuring perfect
            accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-brandDark rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-brandLight dark:text-brandLight" />
              </div>
              <h3 className="text-xl font-semibold text-brandLight dark:text-brandDark mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        {/* {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                </div>
              )}
            </motion.div>
          ))} */}
      </div>
    </section>
  );
};

export default Solution;
