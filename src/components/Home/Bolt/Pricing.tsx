"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Building, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    period: "month",
    description: "Perfect for small teams getting started",
    badge: null,
    icon: Zap,
    features: [
      "500 documents/month",
      "Basic OCR extraction",
      "JSON/CSV export",
      "Email support",
      "Standard accuracy (97%)",
      "GDPR compliant",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "149",
    period: "month",
    description: "Ideal for growing businesses",
    badge: "Most Popular",
    icon: Crown,
    features: [
      "2,500 documents/month",
      "Advanced AI OCR",
      "Custom field extraction",
      "API integration",
      "Priority support",
      "Advanced accuracy (99.5%)",
      "Multi-language support",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations with specific needs",
    badge: "Contact Sales",
    icon: Building,
    features: [
      "Unlimited documents",
      "Premium AI models",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "Highest accuracy (99.8%)",
      "Custom workflows",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors">
            <Crown className="mr-1 h-3 w-3" />
            Simple Pricing
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose the Plan That Fits Your Needs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees. No setup costs. Cancel anytime. Start with a 14-day free trial on any plan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`h-full relative rounded-lg border bg-white shadow-sm ${
                  plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center p-6 pb-4">
                  <div
                    className={`mx-auto h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${
                      plan.popular ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <plan.icon className={`h-6 w-6 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price === "Custom" ? "" : "€"}
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </div>

                <div className="p-6">
                  <button
                    className={`w-full mb-6 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                        : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Not Sure Which Plan Is Right for You?</h3>
          <p className="text-blue-800 mb-6">
            Start with our free trial and our team will help you find the perfect plan based on your document volume and specific
            needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Start Free Trial
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-blue-600 bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
