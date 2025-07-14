"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-400 transition-colors">
            <Zap className="mr-1 h-3 w-3" />
            Ready to Transform Your Workflow?
          </div>

          <h2 className="text-3xl font-bold mb-6 sm:text-4xl">Stop Wasting Time on Manual Data Entry</h2>

          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of finance teams who have already eliminated manual document processing. Start your free trial today
            and see the difference AI can make.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
            <button className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <Clock className="h-5 w-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <Shield className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <Zap className="h-5 w-5" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-blue-100 mb-4">Trusted by finance teams at</p>
            <div className="flex items-center justify-center gap-8 text-white/60">
              <span className="text-lg font-semibold">TechFlow</span>
              <span className="text-lg font-semibold">GreenTech</span>
              <span className="text-lg font-semibold">Atlantic</span>
              <span className="text-lg font-semibold">Precision</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
