'use client';
import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';

type Button = {
  title: string;
  func: () => void;
  textStyle?: string;
  //props?: Record<string, any>; // Allows any additional props
} & React.HTMLAttributes<HTMLButtonElement>;

const ActionButton = ({ title, textStyle, func }: Button): ReactElement => {
  return (
    <motion.button
      className={`py-2.5 px-4 text-center rounded-full duration-150 font-medium text-sm text-white bg-brandLight hover:bg-brandDark dark:bg-brandDark dark:hover:bg-brandLight active:bg-gray-900 ${
        textStyle || ''
      }`}
      onClick={() => func()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {title}
    </motion.button>
  );
};

export default ActionButton;
