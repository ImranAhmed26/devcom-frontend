import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/Shared/FramerConsts';

const H3 = ({ para }: { para: string }) => {
  return (
    <motion.h3
      className='text-2xl font-medium sm:font-normal sm:text-3xl text-center max-w-5xl font-base mx-auto '
      variants={itemVariants()}
    >
      {para}
    </motion.h3>
  );
};

export default H3;
