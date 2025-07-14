"use client";

import { motion } from "framer-motion";
import { Brain, Shield, Zap, Globe, Database, Settings, FileText, BarChart3, Lock, Clock, Users, Smartphone } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI OCR",
    description: "State-of-the-art machine learning models trained on millions of documents for 99.8% accuracy.",
    category: "AI Technology",
  },
  {
    icon: FileText,
    title: "Multi-Format Support",
    description: "Process PDF, JPG, PNG, and scanned documents. Handles invoices, receipts, contracts, and more.",
    category: "Document Processing",
  },
  {
    icon: Database,
    title: "Structured Output",
    description: "Export to JSON, CSV, XML, or integrate directly with your ERP, accounting, or CRM systems.",
    category: "Data Export",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Process documents in seconds, not hours. Bulk upload support for high-volume operations.",
    category: "Performance",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified, GDPR compliant, with end-to-end encryption and data residency options.",
    category: "Security",
  },
  {
    icon: Settings,
    title: "Custom Fields",
    description: "Define custom extraction rules and validation logic for your specific document types.",
    category: "Customization",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Support for 50+ languages including English, German, Dutch, French, Spanish, and more.",
    category: "Localization",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track processing volumes, accuracy rates, and team productivity with detailed insights.",
    category: "Analytics",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "Your data never leaves your region. EU data stays in EU, US data stays in US.",
    category: "Compliance",
  },
  {
    icon: Clock,
    title: "24/7 Processing",
    description: "Automated processing queue handles documents around the clock, even when you're offline.",
    category: "Automation",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Multi-user access with role-based permissions, approval workflows, and audit trails.",
    category: "Collaboration",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Process documents on-the-go with our mobile app. Perfect for field teams and remote work.",
    category: "Mobile",
  },
];

export function Features() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors">
            <Zap className="mr-1 h-3 w-3" />
            Powerful Features
          </div>
          <h2 className="text-3xl font-bold  mb-4">Everything You Need to Automate Document Processing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built for finance teams who demand accuracy, security, and scalability. Every feature designed to make your work
            easier.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="cursor-pointer h-full rounded-large border-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-pentaGray p-6 shadow-sm hover:border-blue-200 dark:hover:border-brandDark transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-brandDark flex items-center justify-center group-hover:bg-blue-200 transition-colors rounded-medium">
                    <feature.icon className="h-6 w-6 text-brandLight dark:text-brandLight " />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-indigo-900 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-400">
                    {feature.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold  mb-2 dark:text-brandDark">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 dark:bg-indigo-950 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-indigo-200 mb-4">Ready to Transform Your Document Workflow?</h3>
            <p className="text-blue-800 dark:text-blue-50 mb-6">
              Join thousands of finance teams who have already eliminated manual data entry and reduced processing time by 95%.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-50">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-200">
                <Shield className="h-4 w-4" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-200">
                <Users className="h-4 w-4" />
                <span className="text-sm">No credit card required</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
