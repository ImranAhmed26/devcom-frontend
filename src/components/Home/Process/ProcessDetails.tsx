'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ProcessStep } from '../../../types/Home/processStep';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ProcessDetailsProps {
  activeStep: ProcessStep;
}

export const ProcessDetails = ({ activeStep }: ProcessDetailsProps) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div>[]</div>;

  return (
    <div className='relative h-[300px] rounded-3xl border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/5 p-8 overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeStep.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='relative z-10'
        >
          <h3 className='text-3xl font-bold  mb-4'>{activeStep.title}</h3>
          <div className='text'>{activeStep.longDescription}</div>
        </motion.div>
      </AnimatePresence>
      <div
        className={`absolute inset-0 ${
          !isDark
            ? 'bg-gradient-to-br from-indigo-100/50 via-transparent to-violet-100/50'
            : 'bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10'
        } `}
      />
    </div>
  );
};
