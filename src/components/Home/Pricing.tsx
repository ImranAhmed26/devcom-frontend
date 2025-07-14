"use client";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "€49",
    period: "per month",
    description: "Perfect for small businesses just getting started",
    features: [
      "1,000 documents per month",
      "Standard OCR accuracy",
      "Email support",
      "Basic API access",
      "Data export (JSON/CSV)",
      "7-day data retention"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "€199",
    period: "per month",
    description: "Ideal for growing companies with higher volume needs",
    features: [
      "5,000 documents per month",
      "Enhanced OCR accuracy",
      "Priority email & chat support",
      "Full API access",
      "Advanced analytics",
      "30-day data retention",
      "Custom field extraction",
      "Batch processing"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited documents",
      "Highest OCR accuracy",
      "24/7 dedicated support",
      "Custom API integration",
      "Advanced security features",
      "Custom data retention",
      "SLA guarantee",
      "On-premise deployment option"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing = () => {
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
            Transparent Pricing for Every Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Choose the perfect plan for your needs
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border ${plan.popular ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <FaCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${plan.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center text-gray-500 dark:text-gray-400"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;