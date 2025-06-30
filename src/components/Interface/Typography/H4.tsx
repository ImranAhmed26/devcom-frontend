import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/Shared/FramerConsts';

const H4 = ({ para }: { para: string }) => {
  return (
    <motion.h4
      className='text-xl text-center max-w-5xl sm:text-2xl font-base mx-auto '
      variants={itemVariants()}
    >
      {para}
    </motion.h4>
  );
};

export default H4;
