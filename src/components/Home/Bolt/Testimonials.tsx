"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Finance Director",
    company: "TechFlow Solutions",
    location: "Berlin, Germany",
    avatar: "SM",
    rating: 5,
    quote:
      "DocuMind transformed our invoice processing completely. What used to take our team 4 hours now takes 15 minutes. The accuracy is incredible, and our accountants can finally focus on analysis instead of data entry.",
    metrics: { timeSaved: "85%", errorReduction: "98%" },
  },
  {
    name: "Michael Thompson",
    role: "CFO",
    company: "GreenTech Innovations",
    location: "Amsterdam, Netherlands",
    avatar: "MT",
    rating: 5,
    quote:
      "As a growing startup, we needed a solution that could scale with us. DocuMind handles our increasing document volume effortlessly. The GDPR compliance was crucial for our EU operations.",
    metrics: { timeSaved: "92%", errorReduction: "99%" },
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "Atlantic Logistics",
    location: "New York, USA",
    avatar: "ER",
    rating: 5,
    quote:
      "The ROI was immediate. We eliminated two part-time positions and reduced our processing costs by 60%. The team loves how easy it is to use, and our clients appreciate the faster turnaround.",
    metrics: { timeSaved: "78%", errorReduction: "95%" },
  },
  {
    name: "Klaus Weber",
    role: "Head of Accounting",
    company: "Precision Manufacturing",
    location: "Munich, Germany",
    avatar: "KW",
    rating: 5,
    quote:
      "The multi-language support is fantastic. We process invoices in German, English, and French with perfect accuracy. The integration with our ERP system was seamless.",
    metrics: { timeSaved: "88%", errorReduction: "97%" },
  },
  {
    name: "Lisa Chen",
    role: "Financial Analyst",
    company: "Digital Dynamics",
    location: "London, UK",
    avatar: "LC",
    rating: 5,
    quote:
      "DocuMind is a game-changer for our month-end close process. We went from 5 days to 2 days. The custom field extraction works perfectly for our specific document types.",
    metrics: { timeSaved: "90%", errorReduction: "96%" },
  },
  {
    name: "David Park",
    role: "Finance Manager",
    company: "Global Trade Corp",
    location: "Chicago, USA",
    avatar: "DP",
    rating: 5,
    quote:
      "The security features give us complete peace of mind. Our audit team was impressed with the compliance documentation. It's the most reliable OCR solution we've used.",
    metrics: { timeSaved: "82%", errorReduction: "98%" },
  },
];

const stats = [
  { value: "10,000+", label: "Companies Trust Us" },
  { value: "50M+", label: "Documents Processed" },
  { value: "99.8%", label: "Accuracy Rate" },
  { value: "24/7", label: "Support Available" },
];

export function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors">
            <Star className="mr-1 h-3 w-3" />
            Customer Success
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Finance Teams Across EU & US</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how companies like yours are saving time, reducing errors, and scaling their operations with DocuMind AI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-blue-200 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{testimonial.rating}.0</span>
                </div>

                <Quote className="h-6 w-6 text-blue-600 mb-4" />

                <blockquote className="text-gray-700 mb-6 leading-relaxed">{testimonial.quote}</blockquote>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold text-green-600">{testimonial.metrics.timeSaved}</span>
                      <span className="text-gray-600"> time saved</span>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">{testimonial.metrics.errorReduction}</span>
                      <span className="text-gray-600"> fewer errors</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {testimonial.company} • {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
