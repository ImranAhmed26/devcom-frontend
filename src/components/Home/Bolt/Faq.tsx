"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the OCR extraction?",
    answer:
      "Our AI-powered OCR achieves 99.8% accuracy on standard invoices and receipts. For custom document types, accuracy typically ranges from 97-99.5% depending on document quality and structure. We continuously improve our models based on user feedback.",
  },
  {
    question: "Is my data secure and GDPR compliant?",
    answer:
      "Absolutely. We are SOC 2 Type II certified and fully GDPR compliant. Your documents are encrypted in transit and at rest, processed in your chosen region (EU data stays in EU, US data stays in US), and automatically deleted after processing unless you choose to retain them.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "We support PDF, JPG, PNG, TIFF, and most common image formats. Documents can be scanned, photographed, or digital. We handle multi-page documents and can process files up to 50MB in size.",
  },
  {
    question: "How long does processing take?",
    answer:
      "Most documents are processed within 5-30 seconds depending on complexity. Bulk uploads are processed in parallel, so even large batches complete quickly. You'll receive real-time notifications when processing is complete.",
  },
  {
    question: "Can I integrate with my existing systems?",
    answer:
      "Yes, we offer robust API integration and pre-built connectors for popular ERP, accounting, and CRM systems including SAP, QuickBooks, Xero, Salesforce, and more. Our technical team can help with custom integrations.",
  },
  {
    question: "What languages do you support?",
    answer:
      "We support 50+ languages including English, German, Dutch, French, Spanish, Italian, Portuguese, and many others. Our AI can handle mixed-language documents and automatically detect the primary language.",
  },
  {
    question: "Do you offer custom field extraction?",
    answer:
      "Yes, you can define custom fields and validation rules for your specific document types. Our AI learns from your corrections to improve accuracy over time. Enterprise plans include advanced customization options.",
  },
  {
    question: "What happens if I exceed my monthly limit?",
    answer:
      "We'll notify you when you approach your limit. You can upgrade your plan instantly or purchase additional documents for the current month. We never stop processing without warning - your operations continue smoothly.",
  },
  {
    question: "Is there a setup fee or long-term contract?",
    answer:
      "No setup fees and no long-term contracts required. You can start with a 14-day free trial and cancel anytime. We believe in earning your business through great service, not contracts.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer email support for all plans, priority support for Professional plans, and 24/7 phone support for Enterprise customers. Our team includes OCR specialists who can help optimize your document processing workflows.",
  },
];

function AccordionItem({ faq, index, isOpen, onToggle }: { faq: any; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
        onClick={onToggle}
      >
        <span className="font-semibold text-gray-900">{faq.question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors">
            <HelpCircle className="mr-1 h-3 w-3" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Know</h2>
          <p className="text-lg text-gray-600">
            Common questions about DocuMind AI and document processing. Can't find what you're looking for? We're here to help.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <MessageCircle className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">Our team is here to help. Get in touch and we'll respond within 24 hours.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Contact Support
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
