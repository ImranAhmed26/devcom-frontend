import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProcessCardProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export const ProcessCard = ({
  icon: Icon,
  step,
  title,
  description,
  isActive,
  onClick,
}: ProcessCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer relative overflow-hidden rounded-3xl border ${
        isActive
          ? 'border-brandLight dark:border-brandDark bg-black/10 dark:border-white/20 dark:bg-white/10'
          : 'border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5'
      } p-6 transition-all duration-300`}
    >
      <div
        className={`absolute top-0 right-0 p-4 ${
          isActive
            ? 'text-gray-700/45 dark:text-gray-200/50'
            : 'text-black/20 dark:text-white/20'
        } `}
      >
        <span className='text-7xl font-bold'>
          {String(step).padStart(2, '0')}
        </span>
      </div>
      <div className='relative'>
        <Icon
          className={`h-8 w-8 mb-4 ${
            isActive
              ? 'text-brandLight dark:text-brandDark'
              : 'text-black/40 dark:text-white/40'
          }`}
        />
        <h3
          className={`text-xl font-semibold ${
            isActive
              ? 'text-brandLight dark:text-brandDark'
              : 'text-black/70 dark:text-white/70'
          } mb-2 mt-5`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            isActive
              ? 'text-black/80 dark:text-white/80'
              : 'text-black/60 dark:text-white/40'
          }`}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};
