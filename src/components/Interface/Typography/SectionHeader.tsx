'use client'
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='mx-auto w-full max-w-3xl px-4 text-center sm:px-8 mb-10 lg:mb-16 lg:mt-16 xl:px-0'
    >
      <h2 className='text-4xl lg:text-5xl font-bold -tracking-[1.6px]  lg:text-heading-4 xl:text-heading-2'>
        {title}
      </h2>

      <p className='max-w-2xl mx-auto pt-2 text-brandDark'>{description}</p>
    </motion.div>
  );
};

export default SectionHeader;
