"use client";
import { motion } from "framer-motion";
import { AppButton } from "../Interface/Button/AppButton";
import { ArrowRight, CheckCircle, PlayCircle } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-large">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl font-bold text-white mb-8">Ready to Transform Your Document Processing?</h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            {`Join 2,500+ finance teams who've already eliminated manual data entry and saved millions in processing costs. Start
            your free trial today—no credit card required, no setup fees, no risk.`}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">14 Days</div>
              <div className="text-blue-100">Free Trial</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5 Minutes</div>
              <div className="text-blue-100">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.8%</div>
              <div className="text-blue-100">Accuracy Guaranteed</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <AppButton className="text-blue-600 text-xl px-12 py-8 shadow-xl">
              Start Free 14-Day Trial
              <ArrowRight className="ml-3 w-6 h-6" />
            </AppButton>
            <AppButton className="border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-8 bg-transparent">
              <PlayCircle className="mr-3 w-6 h-6" />
              Watch Demo
            </AppButton>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>24/7 support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
