"use client";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const FinalCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <FaRocket className="w-12 h-12 text-white mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Document Processing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of companies saving time and reducing costs with our AI-powered OCR solution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Schedule Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-blue-100 text-sm"
          >
            <p>No credit card required • 14-day free trial • Cancel anytime</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;