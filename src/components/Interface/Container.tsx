import { motion } from 'framer-motion';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='mb-16'
  >
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 ${className}`}>
      {children}
    </div>
  </motion.div>
);
