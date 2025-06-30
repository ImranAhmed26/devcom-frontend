import { motion } from 'framer-motion';

export const HighlightWords = (text: string, wordsToHighlight: string[]) => {
  const regex = new RegExp(
    `(${wordsToHighlight
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})`,
    'gi'
  );
  return text.split(regex).map((part, index) =>
    wordsToHighlight.includes(part.toLowerCase()) ? (
      <motion.span
        key={index}
        className='text-brandLight dark:text-brandDark'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {part}
      </motion.span>
    ) : (
      part
    )
  );
};
