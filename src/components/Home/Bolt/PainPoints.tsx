'use client';

import { motion } from 'framer-motion';
import { Clock, AlertCircle, DollarSign, Users } from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    title: 'Hours Lost Daily',
    description: 'Your team spends 3-4 hours every day manually extracting data from invoices and receipts.',
    stat: '40%',
    statLabel: 'of finance time wasted'
  },
  {
    icon: AlertCircle,
    title: 'Human Errors',
    description: 'Manual data entry leads to costly mistakes, delayed payments, and compliance issues.',
    stat: '23%',
    statLabel: 'error rate in manual entry'
  },
  {
    icon: DollarSign,
    title: 'Hidden Costs',
    description: 'Processing costs spiral as your business grows, requiring more staff and resources.',
    stat: '$50K+',
    statLabel: 'annual processing costs'
  },
  {
    icon: Users,
    title: 'Team Frustration',
    description: 'Talented professionals stuck doing repetitive work instead of strategic analysis.',
    stat: '65%',
    statLabel: 'want to automate tasks'
  }
];

export function PainPoints() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Hidden Cost of Manual Document Processing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every day, finance teams across Europe and the US face the same exhausting challenges.
            Sound familiar?
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <point.icon className="h-8 w-8 text-red-500" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">
                      {point.stat}
                    </div>
                    <div className="text-xs text-gray-500">
                      {point.statLabel}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-red-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-red-900 mb-4">
              The Real Question Is: How Much Is This Costing You?
            </h3>
            <p className="text-red-800">
              A mid-sized company processing 500 documents monthly loses approximately 
              <span className="font-bold"> €120,000 annually</span> in inefficiencies, 
              errors, and missed opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}