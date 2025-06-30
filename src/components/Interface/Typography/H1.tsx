import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/Shared/FramerConsts';

const H1 = (para: string) => {
  return (
    <motion.h1
      className='text-4xl font-extrabold mx-auto sm:text-6xl'
      variants={itemVariants()}
    >
      {para}
    </motion.h1>
  );
};

export default H1;
