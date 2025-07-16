"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Basic",
      monthlyPrice: 39,
      yearlyPrice: 390,
      documents: "Perfect for individuals and small companies",
      extraDocPrice: "",
      features: [
        "500 Documents monthly",
        "14 days trial period",
        "$0.08 / extra doc",
        "Invoice & receipt OCR",
        "3 Users",
        "Email support",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-gray-900 hover:bg-gray-800 text-white",
    },
    {
      name: "Growth",
      monthlyPrice: 99,
      yearlyPrice: 990,
      documents: "For companies with high volume of documents",
      extraDocPrice: "",
      features: ["1,500 Documents monthly", "14 days trial period", "$0.7 / extra doc", "API access", "Email support"],
      buttonText: "Get Started",
      buttonStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
      popular: true,
    },
    {
      name: "Pro",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      documents: "For large teams and enterprises with high volume of documents",
      extraDocPrice: "",
      features: [
        "5,000 Documents monthly",
        "14 days trial period",
        "$0.06 / extra doc",
        "SLA & dedicated account manager",
        "Advanced Models/ Customized needs for extra charge",
        "Priority support",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-gray-900 hover:bg-gray-800 text-white",
      isEnterprise: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const priceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="py-6 bg-gray-50 rounded-large">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pricing Plans.</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple and transparent pricing. No surprise fees.</p>
        </motion.div>

        {/* Monthly/Yearly Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <motion.span
                layout
                className="inline-block h-4 w-4 bg-white rounded-full shadow-sm"
                animate={{
                  x: isYearly ? 24 : 4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium transition-colors ${isYearly ? "text-gray-900" : "text-gray-500"}`}>
                Annually
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Save ~17%</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className={`relative bg-white rounded-large p-8 shadow-md hover:shadow-xl transition-shadow ${
                plan.popular ? "ring-2 ring-indigo-500 shadow-lg" : "hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                <div className="mb-">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${plan.name}-${isYearly}`}
                      variants={priceVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-end justify-center"
                    >
                      {/* {plan.isEnterprise ? (
                        <div className="text- 2xl font-bold text-gray-900">Custom</div>
                      ) : ( */}
                      <>
                        <span className="text-5xl font-bold text-gray-900">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-lg text-gray-500 ml-2">/{isYearly ? "year" : "month"}</span>
                      </>
                      {/* )} */}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="h-6 my-1 line-through">{isYearly && <div>1200</div>}</div>

                <div className="text-sm text-gray-600 mb-6">
                  <div className="font-medium">{plan.documents}</div>
                  <div className="text-xs mt-1">{plan.extraDocPrice}</div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${plan.buttonStyle} mb-8`}
                >
                  {plan.buttonText}
                </motion.button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 text-left">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-500">All plans include SSL encryption, 99.9% uptime guarantee, and 24/7 monitoring.</p>
        </motion.div>
      </div>
    </div>
  );
}
