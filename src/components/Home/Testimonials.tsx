"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Finance Director",
    company: "TechCorp Solutions",
    image: "/assets/placeholder-image.jpg",
    quote: "The accuracy of the OCR system is remarkable. We've reduced our invoice processing time by 75% and virtually eliminated data entry errors."
  },
  {
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Global Logistics Inc",
    image: "/assets/placeholder-image.jpg",
    quote: "The platform's ability to handle multiple languages has been crucial for our international operations. Customer support is also exceptional."
  },
  {
    name: "Anna Schmidt",
    role: "Head of Accounting",
    company: "European Retail Group",
    image: "/assets/placeholder-image.jpg",
    quote: "GDPR compliance was our top priority. This solution not only meets all our security requirements but also delivers outstanding accuracy."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            See how businesses are transforming their document processing
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400"
          >
            <span>Trusted by 500+ companies worldwide</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;